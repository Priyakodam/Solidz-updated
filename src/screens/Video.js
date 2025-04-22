import React, { useRef, useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';

export default function VideoScreen({ route }) {
  const navigation = useNavigation();
  const uri = route?.params?.uri;
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!uri) {
    return (
      <View style={styles.contentContainer}>
        <Text style={{ color: 'red', marginBottom: 20 }}>No video to display!</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const handlePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await videoRef.current.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const saveVideo = async () => {
    try {
      await MediaLibrary.requestPermissionsAsync();
      await MediaLibrary.saveToLibraryAsync(uri);
      alert('Video saved to gallery');
      navigation.navigate('Camera');
    } catch (error) {
      console.error('Error saving video:', error);
    }
  };

  return (
    <View style={styles.contentContainer}>
      <Video
        ref={videoRef}
        source={{ uri }}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setIsPlaying(status.isPlaying)}
      />
      <View style={styles.controlsContainer}>
        <Button title={isPlaying ? 'Pause' : 'Play'} onPress={handlePlayPause} />
        {/* <View style={{ marginTop: 10 }}>
          <Button title="Save to Gallery" onPress={saveVideo} />
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
  },
  video: {
    width: '100%',
    height: 300,
  },
  controlsContainer: {
    padding: 10,
    width: '80%',
  },
});
