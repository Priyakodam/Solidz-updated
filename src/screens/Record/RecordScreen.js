import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons"; 

export default function RecordScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        
        <TouchableOpacity onPress={() => navigation.navigate("CamFunScreen")}>
          <View style={styles.iconWrapper}>
            <FontAwesome5 name="camera" size={50} color="white" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("AudioScreen")}>
          <View style={styles.iconWrapper}>
            <FontAwesome5 name="microphone" size={50} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.iconContainer}>
        
        <TouchableOpacity onPress={() => navigation.navigate("UploadScreen")}>
          <View style={styles.iconWrapper}>
            <FontAwesome5 name="upload" size={50} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#111" },
  iconContainer: { flexDirection: "row", justifyContent: "space-around", width: "80%", marginVertical: 20 },
  iconWrapper: { padding: 20, backgroundColor: "#444", borderRadius: 10, alignItems: "center" },
});
