import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import Video from 'react-native-video';

type Props = {
  children: React.ReactNode;
};

export default function LoginBackgroundVideo({ children }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height; 

  const onReady = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 220,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.root}>
      {isLandscape ? (
        <ImageBackground
          source={require('../../assets/video/poster.png')}
          style={styles.fill}
          imageStyle={styles.cover}
        >
          <View style={styles.overlay}>{children}</View>
        </ImageBackground>
      ) : (
        <ImageBackground
          source={require('../../assets/video/poster.png')}
          style={styles.fill}
          imageStyle={styles.cover}
        >
          <Animated.View style={[styles.fill, { opacity }]}>
            <Video
              source={require('../../assets/video/login_video.mp4')}
              style={styles.fill}
              resizeMode="cover"
              repeat
              muted
              onReadyForDisplay={onReady}
              onLoad={onReady}
            />
          </Animated.View>

          <View style={styles.overlay}>{children}</View>
        </ImageBackground>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  fill: { ...StyleSheet.absoluteFillObject },
  cover: { resizeMode: 'cover' },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
