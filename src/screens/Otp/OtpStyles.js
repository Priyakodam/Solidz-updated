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
  otpCard: {
    width: responsiveWidth(85), 
    backgroundColor: "#d3d3d3", 
    borderRadius: responsiveWidth(4), 
    padding: responsiveWidth(5),
    alignItems: "center",
    shadowColor: "#fff",
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  logo: {
    width: responsiveWidth(25), 
    height: responsiveHeight(10), 
    resizeMode: "contain",
    marginBottom: responsiveHeight(2),
  },
  message: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: "bold",
    color: "#222",
  },
  subMessage: {
    fontSize: responsiveFontSize(1.8),
    color: "#555",
    marginBottom: responsiveHeight(2),
  },
  phoneNumber: {
    fontSize: responsiveFontSize(2),
    color: "blue",
    fontWeight: "bold",
    marginBottom: responsiveHeight(2),
  },
  otpInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpBox: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: responsiveFontSize(2.2),
    borderRadius: responsiveWidth(2),
    marginHorizontal: responsiveWidth(1.5),
    elevation: 2,
  },
  didntReceive: {
    fontSize: responsiveFontSize(1.8),
    color: "#333",
    marginTop: responsiveHeight(2),
  },
  resendText: {
    fontSize: responsiveFontSize(2),
    color: "black",
    fontWeight: "bold",
    marginTop: responsiveHeight(1),
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: responsiveHeight(3),
  },

  otpsubmitbutton: {
    width: responsiveWidth(40),
    height: responsiveHeight(4.5),
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: responsiveWidth(2),
    top :responsiveHeight(1.2),
  },
  otpsubmitbuttonText: {
    color: "#fff",
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
  },
});

export default styles;
