import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from './src/common/colors';
import MainRoute from './src/routes/MainRoute';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import CustomTabBar from './src/routes/CustomNavigations/CustomTabBar';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle="dark-content" // or 'dark-content' depending on your text color preference
          />
          <MainRoute />
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: StatusBar.currentHeight,
  },
});
