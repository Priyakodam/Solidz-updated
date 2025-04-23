// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   Alert,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import styles from "./OtpStyles";
// import logo from "../Img/solidz_logo_png.png";

// export default function OTPScreen({ route, navigation }) {
//   const { generatedOTP } = route.params;
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const inputRefs = useRef([]);

//   useEffect(() => {
//     inputRefs.current[0]?.focus();
//   }, []);

//   const handleOTPChange = (value, index) => {
//     let newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

  
//     if (value && index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleVerifyOTP = () => {
//     const enteredOTP = otp.join("");
//     console.log("Entered OTP:", enteredOTP, "Generated OTP:", generatedOTP);
//     if (enteredOTP === generatedOTP) {
//       setTimeout(() => {
//         navigation.navigate("QRScreen");
//       }, 200); 
//     }  else {
//       Alert.alert("Error", "Incorrect OTP! Try again.");
    
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         keyboardShouldPersistTaps="handled"
//       >
//         <View style={styles.otpCard}>
//           <Image source={logo} style={styles.logo} />
//           <Text style={styles.message}>We have sent you a code</Text>
//           <Text style={styles.subMessage}>
//             Please enter it below to verify your phone number
//           </Text>

//           <View style={styles.otpInputContainer}>
//             {otp.map((digit, index) => (
//               <TextInput
//                 key={index}
//                 ref={(ref) => (inputRefs.current[index] = ref)}
//                 style={styles.otpBox}
//                 keyboardType="numeric"
//                 maxLength={1}
//                 value={digit}
//                 onChangeText={(value) => handleOTPChange(value, index)}
//               />
//             ))}
//           </View>

         
//           <TouchableOpacity style={styles.otpsubmitbutton} onPress={handleVerifyOTP}>
//               <Text style={styles.otpsubmitbuttonText}>Submit</Text>
//             </TouchableOpacity>

//           <Text style={styles.didntReceive}>Didn't receive the code?</Text>
//           <TouchableOpacity>
//             <Text style={styles.resendText}>Send Again</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }







// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   Alert,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import styles from "./OtpStyles";
// import logo from "../Img/solidz_logo_png.png";

// export default function OTPScreen({ route, navigation }) {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const inputRefs = useRef([]);
//   // Track if OTP has been used already
//   const [isOTPUsed, setIsOTPUsed] = useState(false);
//   // Store the valid OTP in a ref
//   const validOTP = useRef(route.params?.generatedOTP || "");

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       // Reset OTP fields but keep track of usage
//       setOtp(["", "", "", "", "", ""]);
//       inputRefs.current[0]?.focus();
//     });

//     return unsubscribe;
//   }, [navigation]);

//   const handleOTPChange = (value, index) => {
//     if (value && !/^[0-9]$/.test(value)) return;

//     let newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     } else if (!value && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleVerifyOTP = () => {
//     if (isOTPUsed) {
//       Alert.alert("Error", "This OTP has already been used. Please request a new one.");
//       return;
//     }

//     const enteredOTP = otp.join("");
    
//     if (enteredOTP.length !== 6) {
//       Alert.alert("Error", "Please enter a complete 6-digit OTP");
//       return;
//     }

//     if (enteredOTP === validOTP.current) {
//       setIsOTPUsed(true); // Mark OTP as used
//       setOtp(["", "", "", "", "", ""]);
//       setTimeout(() => {
//         navigation.navigate("WelcomeScreen");
//       }, 200);
//     } else {
//       Alert.alert("Error", "Incorrect OTP! Try again.");
//       setOtp(["", "", "", "", "", ""]);
//       inputRefs.current[0]?.focus();
//     }
//   };

//   const handleResendOTP = () => {
//     // In a real app, you would call your backend to generate a new OTP
//     // For this example, we'll just reset the state
//     const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
//     validOTP.current = newOTP;
//     setIsOTPUsed(false);
//     setOtp(["", "", "", "", "", ""]);
//     inputRefs.current[0]?.focus();
//     Alert.alert("New OTP Sent", `New verification code has been sent (demo: ${newOTP})`);
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         keyboardShouldPersistTaps="handled"
//       >
//         <View style={styles.otpCard}>
//           <Image source={logo} style={styles.logo} />
//           <Text style={styles.message}>We have sent you a code</Text>
//           <Text style={styles.subMessage}>
//             Please enter it below to verify your phone number
//           </Text>

//           <View style={styles.otpInputContainer}>
//             {otp.map((digit, index) => (
//               <TextInput
//                 key={index}
//                 ref={(ref) => (inputRefs.current[index] = ref)}
//                 style={styles.otpBox}
//                 keyboardType="numeric"
//                 maxLength={1}
//                 value={digit}
//                 onChangeText={(value) => handleOTPChange(value, index)}
//                 onKeyPress={({ nativeEvent }) => {
//                   if (nativeEvent.key === 'Backspace' && !digit && index > 0) {
//                     inputRefs.current[index - 1]?.focus();
//                   }
//                 }}
//               />
//             ))}
//           </View>

//           <TouchableOpacity 
//             style={[
//               styles.otpsubmitbutton,
//               otp.some(digit => !digit) && styles.disabledButton
//             ]} 
//             onPress={handleVerifyOTP}
//             disabled={otp.some(digit => !digit) || isOTPUsed}
//           >
//             <Text style={styles.otpsubmitbuttonText}>
//               {isOTPUsed ? "OTP Used" : "Submit"}
//             </Text>
//           </TouchableOpacity>

//           <Text style={styles.didntReceive}>Didn't receive the code?</Text>
//           <TouchableOpacity onPress={handleResendOTP}>
//             <Text style={styles.resendText}>Send Again</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }





import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "./OtpStyles";
import logo from "../Img/solidz_logo_png.png";

export default function OTPScreen({ route, navigation }) {
  const [otp, setOtp] = useState("");
  const inputRef = useRef(null);
  const [isOTPUsed, setIsOTPUsed] = useState(false);
  const validOTP = useRef(route.params?.generatedOTP || "");

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setOtp("");
      inputRef.current?.focus();
    });

    return unsubscribe;
  }, [navigation]);

  const handleOTPChange = (value) => {
    // Only allow numeric input and limit to 6 digits
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleVerifyOTP = () => {
    if (isOTPUsed) {
      Alert.alert("Error", "This OTP has already been used. Please request a new one.");
      return;
    }

    if (otp.length !== 6) {
      Alert.alert("Error", "Please enter a complete 6-digit OTP");
      return;
    }

    if (otp === validOTP.current) {
      setIsOTPUsed(true);
      setOtp("");
      setTimeout(() => {
        navigation.navigate("WelcomeScreen");
      }, 200);
    } else {
      Alert.alert("Error", "Incorrect OTP! Try again.");
      setOtp("");
      inputRef.current?.focus();
    }
  };

  const handleResendOTP = () => {
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
    validOTP.current = newOTP;
    setIsOTPUsed(false);
    setOtp("");
    inputRef.current?.focus();
    Alert.alert("New OTP Sent", `New verification code has been sent (demo: ${newOTP})`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.otpCard}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.message}>We have sent you a code</Text>
          <Text style={styles.subMessage}>
            Please enter it below to verify your phone number
          </Text>

          <View style={styles.singleOtpContainer}>
            <TextInput
              ref={inputRef}
              style={styles.singleOtpInput}
              keyboardType="numeric"
              maxLength={6}
              value={otp}
              onChangeText={handleOTPChange}
              autoFocus={true}
              placeholder="Enter 6-digit OTP"
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity 
            style={[
              styles.otpsubmitbutton,
              (otp.length !== 6 || isOTPUsed) && styles.disabledButton
            ]} 
            onPress={handleVerifyOTP}
            disabled={otp.length !== 6 || isOTPUsed}
          >
            <Text style={styles.otpsubmitbuttonText}>
              {isOTPUsed ? "OTP Used" : "Submit"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.didntReceive}>Didn't receive the code?</Text>
          <TouchableOpacity onPress={handleResendOTP}>
            <Text style={styles.resendText}>Send Again</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}