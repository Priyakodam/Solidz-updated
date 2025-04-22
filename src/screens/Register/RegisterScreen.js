// import React, { useState,useContext  } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
//   Alert,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import styles from "./RegisterStyles";
// import logo from "../Img/solidz_logo_png.png";
// import { sendOTP } from "../../apiUtils/apiServices/OTPServices";
// import { useUser  } from "../../context/UserContext";

// const RegisterScreen = () => {
//   const navigation = useNavigation();
//   const [localPhoneNumber, setLocalPhoneNumber] = useState("");
//   const { setPhoneNumber } = useUser();


//   const handleRegister = async () => {
//     if (!localPhoneNumber) {
//       Alert.alert("Error", "Please enter your phone number.");
//       return;
//     }
  
//     try {
//       const response = await sendOTP(localPhoneNumber);
//       console.log("Parsed Response:", response);
  
//    if (response.otp) {
//     setPhoneNumber(localPhoneNumber);

  
//     setTimeout(() => {
//       navigation.navigate("Otp", {
//         generatedOTP: response.otp.toString(),
//         mobile: localPhoneNumber,
//       });
//     }, 200);
//   } else {
//     Alert.alert("Error", "OTP not received. Please try again.");
//   }
// } catch (error) {
//   console.error("Error in handleRegister:", error);
//   Alert.alert("Error", "Something went wrong. Please try again.");
// }
// };
  
  
//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//       >
//         <ScrollView
//           contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
//         >
//           <View style={styles.registerCard}>
//             <Image source={logo} style={styles.logo} />
//             <Text style={styles.title}>Register Your Account</Text>

//             <TextInput
//               style={styles.input}
//               placeholder="Phone number"
//               placeholderTextColor="#888"
//               keyboardType="phone-pad"
//               value={localPhoneNumber}
//               onChangeText={setLocalPhoneNumber}
//             />

//             <TouchableOpacity style={styles.button} onPress={handleRegister}>
//               <Text style={styles.buttonText}>Register</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default RegisterScreen;











// import React, { useState, useContext } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
//   Alert,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import styles from "./RegisterStyles";
// import logo from "../Img/solidz_logo_png.png";
// import { sendOTP } from "../../apiUtils/apiServices/OTPServices";
// import { useUser } from "../../context/UserContext";

// const RegisterScreen = () => {
//   const navigation = useNavigation();
//   const [localPhoneNumber, setLocalPhoneNumber] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const { setPhoneNumber } = useUser();

//   const handleRegister = async () => {
//     if (!localPhoneNumber) {
//       Alert.alert("Error", "Please enter your phone number.");
//       return;
//     }

//     if (isLoading) return; // Prevent multiple clicks

//     setIsLoading(true);

//     try {
//       const response = await sendOTP(localPhoneNumber);
//       console.log("Parsed Response:", response);

//       if (response.otp) {
//         setPhoneNumber(localPhoneNumber);

//         setTimeout(() => {
//           navigation.navigate("Otp", {
//             generatedOTP: response.otp.toString(),
//             mobile: localPhoneNumber,
//           });
//         }, 200);
//       } else {
//         Alert.alert("Error", "OTP not received. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error in handleRegister:", error);
//       Alert.alert("Error", "Something went wrong. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//       >
//         <ScrollView
//           contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
//         >
//           <View style={styles.registerCard}>
//             <Image source={logo} style={styles.logo} />
//             <Text style={styles.title}>Register Your Account</Text>

//             <TextInput
//               style={styles.input}
//               placeholder="Phone number"
//               placeholderTextColor="#888"
//               keyboardType="phone-pad"
//               value={localPhoneNumber}
//               onChangeText={setLocalPhoneNumber}
//             />

//             <TouchableOpacity 
//               style={styles.button} 
//               onPress={handleRegister}
//               disabled={isLoading}
//             >
//               <Text style={styles.buttonText}>
//                 {isLoading ? "Processing..." : "Register"}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default RegisterScreen;



import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./RegisterStyles";
import logo from "../Img/solidz_logo_png.png";
import { sendOTP } from "../../apiUtils/apiServices/OTPServices";
import { useUser } from "../../context/UserContext";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [localPhoneNumber, setLocalPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setPhoneNumber } = useUser();
  const phoneInputRef = useRef(null);

  const handlePhoneNumberChange = (text) => {
    // Remove any non-digit characters
    const cleanedText = text.replace(/[^0-9]/g, '');
    setLocalPhoneNumber(cleanedText);
    
    // Dismiss keyboard when 10 digits are entered
    if (cleanedText.length === 10) {
      Keyboard.dismiss();
    }
  };

  const handleRegister = async () => {
    if (!localPhoneNumber) {
      Alert.alert("Error", "Please enter your phone number.");
      return;
    }

    if (localPhoneNumber.length !== 10) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number.");
      return;
    }

    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await sendOTP(localPhoneNumber);
      console.log("Parsed Response:", response);

      if (response.otp) {
        setPhoneNumber(localPhoneNumber);

        setTimeout(() => {
          navigation.navigate("Otp", {
            generatedOTP: response.otp.toString(),
            mobile: localPhoneNumber,
          });
        }, 200);
      } else {
        Alert.alert("Error", "OTP not received. Please try again.");
      }
    } catch (error) {
      console.error("Error in handleRegister:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.registerCard}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.title}>Register Your Account</Text>

            <TextInput
              ref={phoneInputRef}
              style={styles.input}
              placeholder="Phone number"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
              value={localPhoneNumber}
              onChangeText={handlePhoneNumberChange}
              maxLength={10}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={true}
            />

            <TouchableOpacity 
              style={styles.button} 
              onPress={handleRegister}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Processing..." : "Register"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;