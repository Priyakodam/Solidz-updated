import { StyleSheet } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: responsiveHeight(8),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#282927",
    zIndex: 1000,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  logo: {
    height: responsiveHeight(15),
    width: responsiveWidth(25),
    resizeMode: "contain",
    marginTop: responsiveHeight(3.5), 
  },
  topRightIcons: {
    flexDirection: "row",
    gap: responsiveWidth(4),
    marginTop: responsiveHeight(3.5),
  },
  glassNavbar: {
    position: "absolute",
    bottom: responsiveHeight(2.1),
    left: "50%",
    transform: [{ translateX: -responsiveWidth(40) }],
    width: responsiveWidth(80),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "black",
    padding: responsiveWidth(6),
    borderRadius: responsiveWidth(10),
    shadowColor: "#fff",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  iconWrapper: {
    width: responsiveWidth(13),
    height: responsiveWidth(8),
    borderRadius: responsiveWidth(7),
    justifyContent: "center",
    alignItems: "center",
  },
  activeIconWrapper: {
    backgroundColor: "white",
  },
});

export default styles;
