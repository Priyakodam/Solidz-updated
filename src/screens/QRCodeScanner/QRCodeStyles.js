import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  message: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    paddingBottom: 10,
  },

  
  overlay: {
    position: 'absolute',
    top: '25%', 
    left: '10%',
    width: '80%',
    height: '40%', 
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrame: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },

  borderTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'white',
  },
  borderTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: 'white',
  },
  borderBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'white',
  },
  borderBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: 'white',
  },

 
  controls: {
    position: 'absolute',
    bottom: responsiveHeight(15),
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: responsiveWidth(5),
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});