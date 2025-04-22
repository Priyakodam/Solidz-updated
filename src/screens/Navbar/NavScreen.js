import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./NavStyle";
import logo from "../Img/solidz_logo_png.png";

const NavScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeIcon, setActiveIcon] = useState(route.name); 

  useFocusEffect(
    React.useCallback(() => {
      setActiveIcon(route.name); 
    }, [route.name])
  );

  const handleIconClick = (iconName) => {
    if (route.name !== iconName) {
      navigation.navigate(iconName);
    }
  };

  return (
    <>
      
      <View style={styles.topBar}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.topRightIcons}>
          <TouchableOpacity onPress={() => console.log("Notifications clicked")}>
            <Icon name="bell" size={25} color="#2a2927" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
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
          <TouchableOpacity key={item.name} onPress={() => handleIconClick(item.name)}>
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
