// import React, { useState, useEffect } from "react";
// import { View, TouchableOpacity, Image } from "react-native";
// import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import styles from "./NavStyle";
// import { Alert } from 'react-native';
// import logo from "../Img/solidz_logo_png.png";

// const NavScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const [activeIcon, setActiveIcon] = useState(route.name);

//   useFocusEffect(
//     React.useCallback(() => {
//       setActiveIcon(route.name);
//     }, [route.name])
//   );

//   const handleIconClick = (iconName) => {
//     if (route.name !== iconName) {
//       navigation.navigate(iconName);
//     }
//   };

//   return (
//     <>

//       <View style={styles.topBar}>
//         <Image source={logo} style={styles.logo} />
//         <View style={styles.topRightIcons}>
//           <TouchableOpacity onPress={() => console.log("Notifications clicked")}>
//             <Icon name="bell" size={25} color="#2a2927" />
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() =>
//               Alert.alert(
//                 "Confirm Logout",
//                 "Are you sure you want to log out?",
//                 [
//                   {
//                     text: "Cancel",
//                     style: "cancel",
//                   },
//                   {
//                     text: "Logout",
//                     onPress: () => navigation.navigate("Register"), // or your logout logic
//                   },
//                 ],
//                 { cancelable: true }
//               )
//             }
//           >
//             <Icon name="sign-out" size={32} color="#2a2927" />
//           </TouchableOpacity>

//         </View>
//       </View>


//       <View style={styles.glassNavbar}>
//         {[
//           { name: "QRScreen", icon: "qrcode" },
//           { name: "Record", icon: "microphone" },
//           { name: "Schedule", icon: "calendar" },
//           { name: "Checklist", icon: "clipboard" },
//         ].map((item) => (
//           <TouchableOpacity key={item.name} onPress={() => handleIconClick(item.name)}>
//             <View
//               style={[
//                 styles.iconWrapper,
//                 activeIcon === item.name && styles.activeIconWrapper,
//               ]}
//             >
//               <Icon
//                 name={item.icon}
//                 size={24}
//                 color={activeIcon === item.name ? "black" : "white"}
//               />
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </>
//   );
// };

// export default NavScreen;







import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./NavStyle";
import { Alert } from 'react-native';
import logo from "../Img/solidz_logo_png.png";

const NavScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeIcon, setActiveIcon] = useState(route.name);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setActiveIcon(route.name);
      setLoading(false); // Reset loading when screen is focused
    }, [route.name])
  );

  const handleIconClick = (iconName) => {
    if (route.name !== iconName) {
      setLoading(true);
      navigation.navigate(iconName);
    }
  };

  return (
    <>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )}

      <View style={styles.topBar}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.topRightIcons}>
          <TouchableOpacity onPress={() => console.log("Notifications clicked")}>
            <Icon name="bell" size={25} color="#2a2927" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Confirm Logout",
                "Are you sure you want to log out?",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Logout",
                    onPress: () => navigation.navigate("Register"),
                  },
                ],
                { cancelable: true }
              )
            }
          >
            <Icon name="sign-out" size={32} color="#2a2927" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.glassNavbar}>
        {[
          { name: "QRScreen", icon: "qrcode" },
          { name: "Record", icon: "microphone" },
          { name: "Schedule", icon: "calendar" },
          { name: "Checklist", icon: "clipboard" },
        ].map((item) => (
          <TouchableOpacity 
            key={item.name} 
            onPress={() => handleIconClick(item.name)}
            disabled={loading} // Disable buttons while loading
          >
            <View
              style={[
                styles.iconWrapper,
                activeIcon === item.name && styles.activeIconWrapper,
              ]}
            >
              <Icon
                name={item.icon}
                size={24}
                color={activeIcon === item.name ? "black" : "white"}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default NavScreen;









