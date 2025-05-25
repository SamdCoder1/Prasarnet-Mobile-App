import {StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default function GradientBackground({children}) {
  return (
    <LinearGradient
      colors={['#FFF', '#FFF', '#cfeefc']}
      style={styles.container}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
