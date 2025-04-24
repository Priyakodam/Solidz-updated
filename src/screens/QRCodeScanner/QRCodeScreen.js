// import React, { useState, useEffect, useRef } from "react";
// import { Text, View, StyleSheet, Button, Linking } from "react-native";
// import { CameraView, Camera } from "expo-camera";
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from "react-native-responsive-dimensions";
// import { useUser } from "../../context/UserContext";
// import { storeQRData } from  "../../apiUtils/apiServices/QRScannerServices";

// export default function App() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);
//   const isHandlingScan = useRef(false); 
//   const { phoneNumber } = useUser();

//   useEffect(() => {
//     const getCameraPermissions = async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");
//     };

//     getCameraPermissions();
//   }, []);

//   const handleBarcodeScanned = async ({ type, data }) => {
//     if (isHandlingScan.current) return;  
//     isHandlingScan.current = true;
//     setScanned(true);

//     try {
//       const result = await storeQRData(data, phoneNumber);

//       if (result.status === "success") {
//         alert("QR data collected and stored successfully.");
//         console.log("Parsed Success Response:", result);
//       } else {
//         alert("Failed to store QR data.");
//         console.log("Parsed Error Response:", result);
//       }
//     } catch (error) {
//       console.error("Error while storing QR data:", error);
//       alert("Error sending QR data. Check console for details.");
//     }

//     if (data.startsWith("http://") || data.startsWith("https://")) {
//       Linking.openURL(data);
//     } 
//     // else {
//     //   alert(`Scanned Data: ${data}`);
//     // }

//     isHandlingScan.current = false;
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting for camera permission</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <CameraView
//         onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
//         barcodeScannerSettings={{
//           barcodeTypes: ["qr", "pdf417"],
//         }}
//         style={StyleSheet.absoluteFillObject}
//       >
//         <View style={styles.overlay}>
//           <View style={styles.scanBorder} />
//         </View>
//       </CameraView>

//       {scanned && (
//         <View style={styles.buttonContainer}>
//           <Button
//             title={"Tap to Scan Again"}
//             onPress={() => setScanned(false)}
//           />
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "column",
//     justifyContent: "center",
//   },
//   overlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   scanBorder: {
//     width: responsiveWidth(60),
//     height: responsiveWidth(60),
//     borderWidth: 4,
//     borderColor: "white",
//     borderRadius: 10,
//     position: "absolute",
//   },
//   buttonContainer: {
//     position: "absolute",
//     bottom: responsiveHeight(12), 
//     alignSelf: "center",
//     backgroundColor: "rgba(0,0,0,0.7)",
//     paddingVertical: responsiveHeight(1.5),
//     paddingHorizontal: responsiveWidth(2.5),
//     borderRadius: 30,
//   },
// });





// import React, { useState, useEffect, useRef } from "react";
// import { Text, View, StyleSheet, Button, Linking } from "react-native";
// import { CameraView, Camera } from "expo-camera";
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from "react-native-responsive-dimensions";
// import { useUser } from "../../context/UserContext";
// import { storeQRData } from "../../apiUtils/apiServices/QRScannerServices";

// export default function App() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);
//   const [showScanner, setShowScanner] = useState(false); // 👈 Add this
//   const isHandlingScan = useRef(false);
//   const { phoneNumber } = useUser();

//   useEffect(() => {
//     const getCameraPermissions = async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");
//     };

//     getCameraPermissions();
//   }, []);

//   const handleBarcodeScanned = async ({ type, data }) => {
//     if (isHandlingScan.current) return;
//     isHandlingScan.current = true;
//     setScanned(true);

//     try {
//       const result = await storeQRData(data, phoneNumber);

//       if (result.status === "success") {
//         alert("QR data collected and stored successfully.");
//         console.log("Parsed Success Response:", result);
//       } else {
//         alert("Failed to store QR data.");
//         console.log("Parsed Error Response:", result);
//       }
//     } catch (error) {
//       console.error("Error while storing QR data:", error);
//       alert("Error sending QR data. Check console for details.");
//     }

//     if (data.startsWith("http://") || data.startsWith("https://")) {
//       Linking.openURL(data);
//     }

//     isHandlingScan.current = false;
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting for camera permission</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       {!showScanner ? (
//         <View style={styles.openButtonWrapper}>
//           <Button
//             title="Click here to open QRScreen"
//             onPress={() => setShowScanner(true)}
//             color="white" // Tailwind blue-500
//           />
//         </View>
//       ) : (
//         <>
//           <CameraView
//             onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
//             barcodeScannerSettings={{
//               barcodeTypes: ["qr", "pdf417"],
//             }}
//             style={StyleSheet.absoluteFillObject}
//           >
//             <View style={styles.overlay}>
//               <View style={styles.scanBorder} />
//             </View>
//           </CameraView>

//           {scanned && (
//             <View style={styles.buttonContainer}>
//               <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
//             </View>
//           )}
//         </>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "column",
//     justifyContent: "center",
//   },
//   overlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   scanBorder: {
//     width: responsiveWidth(60),
//     height: responsiveWidth(60),
//     borderWidth: 4,
//     borderColor: "white",
//     borderRadius: 10,
//     position: "absolute",
//   },
//   buttonContainer: {
//     position: "absolute",
//     bottom: responsiveHeight(12),
//     alignSelf: "center",
//     backgroundColor: "rgba(0,0,0,0.7)",
//     paddingVertical: responsiveHeight(1.5),
//     paddingHorizontal: responsiveWidth(2.5),
//     borderRadius: 30,
//   },
//   openButtonWrapper: {
//     alignSelf: "center",
//     marginTop: 20,
//     width: responsiveWidth(60), // Button will take 60% of screen width
//     borderRadius: 10,
//     overflow: "hidden", // Ensures rounded corners apply to the button
//     elevation: 3, // Adds a subtle shadow for Android
//     backgroundColor: "#3B82F6", // Matches the button color
//   },
// });





import React, { useState, useEffect, useRef } from "react";
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Linking 
} from "react-native";
import { CameraView, Camera } from "expo-camera";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useUser } from "../../context/UserContext";
import { storeQRData } from "../../apiUtils/apiServices/QRScannerServices";

export default function QRScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
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
      {!showScanner ? (
        <TouchableOpacity
          style={styles.openButton}
          onPress={() => setShowScanner(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Click here to open QRScreen</Text>
        </TouchableOpacity>
      ) : (
        <>
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
            <TouchableOpacity
              style={styles.scanAgainButton}
              onPress={() => setScanned(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.scanAgainText}>Tap to Scan Again</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
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
  openButton: {
    alignSelf: "center",
    backgroundColor: "#3B82F6",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  scanAgainButton: {
    position: "absolute",
    bottom: responsiveHeight(12),
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  scanAgainText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

