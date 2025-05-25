import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

export default function SplashScreen2() {
  const selectSplashImage = () => {
    return require('../assets/images/Applogo.png');
  };

  return (
    <Animated.View
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      entering={FadeIn}
      exiting={FadeOut}>
      <Image
        source={selectSplashImage()}
        style={styles.img}
        // resizeMode="cover"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 200,
    width: 200,
  },
});
