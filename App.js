import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import RegisterScreen from "./src/screens/Register/RegisterScreen";
import OtpScreen from "./src/screens/Otp/OtpScreen";
import NavScreen from "./src/screens/Navbar/NavScreen";
import QRScreen from "./src/screens/QRCodeScanner/QRCodeScreen";
import ChecklistScreen from "./src/screens/Checklist/ChecklistScreen";
import ScheduleScreen from "./src/screens/Schedule/ScheduleScreen";
import RecordScreen from "./src/screens/Record/RecordScreen";
import AudioScreen from './src/screens/AudioScreen';
import Video from './src/screens/Video';
import UploadScreen from "./src/screens/UploadScreen";
import CameraFunction from "./src/screens/CameraFunction";
import { UserProvider } from "./src/context/UserContext";

const Stack = createStackNavigator();

const ScreenWithNav = ({ component: Component }) => {
  return (
   
    <View style={styles.container}>
      <Component />
      <NavScreen />
      
    </View>
    
  );
};


export default function App() {
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }} />
        
        <Stack.Screen
          name="QRScreen"
          options={{ headerShown: false }}
        >
          {() => <ScreenWithNav component={QRScreen} />}
        </Stack.Screen>

        <Stack.Screen
          name="Record"
          options={{ headerShown: false }}
        >
          {() => <ScreenWithNav component={RecordScreen} />}
        </Stack.Screen>
        <Stack.Screen
          name="Schedule"
          options={{ headerShown: false }}
        >
          {() => <ScreenWithNav component={ScheduleScreen} />}
        </Stack.Screen>
        <Stack.Screen
          name="Checklist"
          options={{ headerShown: false }}
        >
          {() => <ScreenWithNav component={ChecklistScreen} />}
        </Stack.Screen>

        <Stack.Screen name="AudioScreen" component={AudioScreen} />
        <Stack.Screen name="Video" component={Video} />
        <Stack.Screen name="UploadScreen" component={UploadScreen} />
        <Stack.Screen name="CamFunScreen" component={CameraFunction} />
      
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
