import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { useUser } from "../context/UserContext";
import {uploadAudio } from "../apiUtils/apiServices/AudioServices";

export default function AudioScreen() {
  const [recording, setRecording] = useState(null);
  const [recordingUri, setRecordingUri] = useState(null);
  const { phoneNumber } = useUser();

  useEffect(() => {
    (async () => {
      await Audio.requestPermissionsAsync();
    })();
  }, []);

  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        alert("Permission to access microphone is required!");
        return;
      }

      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecordingUri(uri);
      setRecording(null);
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={recording ? stopRecording : startRecording}>
        <AntDesign name={recording ? "pausecircle" : "play"} size={80} color="black" />
        <Text>{recording ? "Stop Recording" : "Start Recording"}</Text>
      </TouchableOpacity>

      {recordingUri && (
        <TouchableOpacity style={styles.button} onPress={() => uploadAudio(recordingUri, phoneNumber)}>
          <AntDesign name="upload" size={80} color="black" />
          <Text>Upload Recording</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: { margin: 20, alignItems: "center" },
});