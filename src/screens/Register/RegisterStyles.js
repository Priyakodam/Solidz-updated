import { StyleSheet } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111", 
    justifyContent: "center",
    alignItems: "center",
  },
  registerCard: {
    width: responsiveWidth(90), 
    backgroundColor: "#d3d3d3", 
    borderRadius: responsiveWidth(5), 
    padding: responsiveWidth(5), 
    alignItems: "center",
    shadowColor: "#fff",
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  logo: {
    width: responsiveWidth(30), 
    height: responsiveHeight(10), 
    resizeMode: "contain",
    marginBottom: responsiveHeight(2),
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
    color: "#222",
    marginBottom: responsiveHeight(2),
  },
  input: {
    width: responsiveWidth(80),
    height: responsiveHeight(6),
    backgroundColor: "#fff",
    borderRadius: responsiveWidth(2),
    paddingHorizontal: responsiveWidth(3),
    marginBottom: responsiveHeight(2),
    fontSize: responsiveFontSize(2),
    color: "#000",
    elevation: 2,
  },
  button: {
    width: responsiveWidth(80),
    height: responsiveHeight(6),
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: responsiveWidth(2),
  },
  buttonText: {
    color: "#fff",
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
  },
});

export default styles;
