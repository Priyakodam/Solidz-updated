import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import { Video } from "expo-av";
import { useUser } from "../context/UserContext";
import { uploadVideoToAPI } from "../apiUtils/apiServices/UploadServices";
import { useNavigation } from "@react-navigation/native";

export default function UploadScreen() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const { phoneNumber } = useUser();
  const navigation = useNavigation();

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "video/*", 
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      setSelectedFile(result.assets[0].uri);
      setFileType(result.assets[0].mimeType);
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      Alert.alert("No file selected", "Please select a video file before uploading.");
      return;
    }

    try {
      await uploadVideoToAPI(selectedFile, phoneNumber,navigation);
      Alert.alert("Upload Successful", "Your video has been uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Upload Failed", "Something went wrong while uploading the video.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickFile}>
        <FontAwesome5 name="upload" size={50} color="white" />
      </TouchableOpacity>

      {selectedFile && (
        <View style={styles.fileContainer}>
          {fileType.startsWith("video/") ? (
            <Video
              source={{ uri: selectedFile }}
              style={styles.video}
              useNativeControls
              resizeMode="contain"
              shouldPlay
            />
          ) : (
            <Text style={styles.fileText}>File selected: {selectedFile.split("/").pop()}</Text>
          )}

          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.uploadButtonText}>Upload Video</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#222" },
  button: { padding: 20, backgroundColor: "#444", borderRadius: 50, alignItems: "center" },
  fileContainer: { marginTop: 20, alignItems: "center" },
  video: { width: 300, height: 200 },
  fileText: { color: "white", marginTop: 10 },
  uploadButton: { marginTop: 20, padding: 10, backgroundColor: "#28a745", borderRadius: 5 },
  uploadButtonText: { color: "white", fontWeight: "bold" },
});
