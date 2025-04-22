import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Button, Linking } from "react-native";
import { CameraView, Camera } from "expo-camera";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useUser } from "../../context/UserContext";
import { storeQRData } from  "../../apiUtils/apiServices/QRScannerServices";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const isHandlingScan = useRef(false); 
  const { phoneNumber } = useUser();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = async ({ type, data }) => {
    if (isHandlingScan.current) return;  
    isHandlingScan.current = true;
    setScanned(true);

    try {
      const result = await storeQRData(data, phoneNumber);

      if (result.status === "success") {
        alert("QR data collected and stored successfully.");
        console.log("Parsed Success Response:", result);
      } else {
        alert("Failed to store QR data.");
        console.log("Parsed Error Response:", result);
      }
    } catch (error) {
      console.error("Error while storing QR data:", error);
      alert("Error sending QR data. Check console for details.");
    }

    if (data.startsWith("http://") || data.startsWith("https://")) {
      Linking.openURL(data);
    } else {
      alert(`Scanned Data: ${data}`);
    }

    isHandlingScan.current = false;
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      >
        <View style={styles.overlay}>
          <View style={styles.scanBorder} />
        </View>
      </CameraView>

      {scanned && (
        <View style={styles.buttonContainer}>
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanBorder: {
    width: responsiveWidth(60),
    height: responsiveWidth(60),
    borderWidth: 4,
    borderColor: "white",
    borderRadius: 10,
    position: "absolute",
  },
  buttonContainer: {
    position: "absolute",
    bottom: responsiveHeight(12), 
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(2.5),
    borderRadius: 30,
  },
});
