import { CameraView, Camera } from "expo-camera";
import { useState, useRef, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import Slider from "@react-native-community/slider";
import { useUser } from "../context/UserContext";
import { Alert } from 'react-native';
import { uploadVideoToAPI } from "../apiUtils/apiServices/VideoServices";


export default function CameraFunction() {
  const [cameraPermission, setCameraPermission] = useState();
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState();
  const [micPermission, setMicPermission] = useState();
  const [cameraMode, setCameraMode] = useState("picture");
  const [facing, setFacing] = useState("back");
  const [photo, setPhoto] = useState();
  const [video, setVideo] = useState();
  const [flashMode, setFlashMode] = useState("on");
  const [recording, setRecording] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [uploading, setUploading] = useState(false);
   const { phoneNumber } = useUser();
  let cameraRef = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();
      setCameraPermission(cameraPermission.status === "granted");
      setMediaLibraryPermission(mediaLibraryPermission.status === "granted");
      setMicPermission(microphonePermission.status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (video && video.uri) {
      navigation.navigate("Video", { uri: video.uri });
      setVideo(undefined);
    }
  }, [video, navigation]);

  if (
    cameraPermission === undefined ||
    mediaLibraryPermission === undefined ||
    micPermission === undefined
  ) {
    return <Text>Request Permissions....</Text>;
  } else if (!cameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings
      </Text>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function toggleFlash() {
    setFlashMode((current) => (current === "on" ? "off" : "on"));
  }

  let takePic = async () => {
    let options = { quality: 1, base64: true, exif: false };
    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() =>
        setPhoto(undefined)
      );
    };

    return (
      <SafeAreaView style={styles.imageContainer}>
        <Image style={styles.preview} source={{ uri: photo.uri }} />
        <View style={styles.btnContainer}>
          {mediaLibraryPermission && (
            <TouchableOpacity style={styles.btn} onPress={savePhoto}>
              <Ionicons name="save-outline" size={30} color="black" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setPhoto(undefined)}
          >
            <Ionicons name="trash-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }



  
  
  

  async function recordVideo() {
    setRecording(true);
    try {
      const newVideo = await cameraRef.current.recordAsync({ maxDuration: 30 });
      setVideo(newVideo);
      setRecording(false);
  
      Alert.alert(
        "Upload Video",
        "Do you want to upload this video?",
        [
          {
            text: "No",
            onPress: () => console.log("Upload cancelled"),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => uploadVideoToAPI(newVideo.uri, phoneNumber, navigation),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Recording failed: ", error);
      setRecording(false);
    }
  }
  
  
  
  function stopRecording() {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
    }
    setRecording(false);
    console.log("Recording stopped");
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
        flash={flashMode}
        mode={cameraMode}
        zoom={zoom}
      >
        <Slider
          style={{
            width: "100%",
            height: 40,
            position: "absolute",
            top: "75%",
          }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="cyan"
          maximumTrackTintColor="white"
          value={zoom}
          onValueChange={(value) => setZoom(value)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse-outline" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCameraMode("picture")}
          >
            <Ionicons name="camera-outline" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCameraMode("video")}
          >
            <Ionicons name="videocam-outline" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleFlash}>
            <Ionicons
              name={flashMode === "on" ? "flash-outline" : "flash-off-outline"}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.shutterContainer}>
          {cameraMode === "picture" ? (
            <TouchableOpacity style={styles.button} onPress={takePic}>
              <Ionicons name="aperture-outline" size={40} color="white" />
            </TouchableOpacity>
          ) : recording ? (
            <TouchableOpacity style={styles.button} onPress={stopRecording}>
              <Ionicons name="stop-circle-outline" size={40} color="red" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={recordVideo}>
              <Ionicons name="play-circle-outline" size={40} color="white" />
            </TouchableOpacity>
          )}

{uploading && <Text style={{ color: "white", textAlign: "center" }}>Uploading video...</Text>}

        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 20,
  },
  shutterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 20,
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    height: "95%",
    width: "100%",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "white",
  },
  btn: {
    justifyContent: "center",
    margin: 10,
    elevation: 5,
  },
});
