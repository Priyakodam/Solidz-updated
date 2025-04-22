import { Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import APIURLS from "../../apiUtils/apiURLs";

export const uploadAudio = async (recordingUri, phoneNumber) => {
  if (!recordingUri) {
    Alert.alert("No Recording", "Please record audio first.");
    return;
  }

  try {
    const base64Audio = await FileSystem.readAsStringAsync(recordingUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const payload = {
      data: JSON.stringify({
        mobile: phoneNumber,
        audio: base64Audio,
        fileType: "audio/m4a",
        timestamp: new Date().toISOString(),
      }),
    };

    console.log("Audio Payload being sent to API:", JSON.stringify(payload, null, 2));

    const response = await fetch(APIURLS.COLLECT_QR_DATA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const rawResponse = await response.text();
    console.log("Raw API Response:", rawResponse);

    try {
      const parsedResponse = JSON.parse(
        rawResponse.replace(/'/g, '"')
      );
      console.log("Parsed Success Response:", JSON.stringify(parsedResponse, null, 2));
    } catch (parseErr) {
      console.error("JSON Parse Error. Raw response received:", rawResponse);
    }

    if (response.ok) {
      Alert.alert("Success", "Audio uploaded successfully!");
    } else {
      Alert.alert("Error", "Upload failed");
    }
  } catch (error) {
    console.error("Error sending audio to API:", error);
    Alert.alert("Error", "Failed to upload audio");
  }
};
