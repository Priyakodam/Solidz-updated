import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

export const uploadVideoToAPI = async (videoUri, phoneNumber, navigation) => {
  try {
    
    const base64Video = await FileSystem.readAsStringAsync(videoUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const payload = {
        data: JSON.stringify({
          image: base64Video, 
          fileType: "video/mp4",
          timestamp: new Date().toISOString(),
          mobile: phoneNumber,
        }),
      };
      
    console.log("Uploading video with payload:", payload);

    // Upload to API
    const response = await fetch(
      "https://app.solidz.io/guard_patrol/collect_data/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const responseText = await response.text();
    console.log("Raw API Response:", responseText);

    const jsonSafeString = responseText.replace(/'/g, '"');
    const result = JSON.parse(jsonSafeString);

    if (result.status === "success") {
      Alert.alert("Success", "Video uploaded successfully", [
        {
          text: "OK",
          onPress: () => {
            setTimeout(() => {
              navigation.navigate("Record");
            }, 200);
          },
        },
      ]);
      
    } else {
      Alert.alert(
        "Upload Failed",
        result.remarks || "Something went wrong, please try again.",
        [{ text: "OK" }]
      );
    }

    return result;
  } catch (error) {
    console.error("Error uploading video: ", error.message);
    Alert.alert(
      "Error",
      "Network or server error while uploading video.",
      [{ text: "OK" }]
    );
    throw error;
  }
};