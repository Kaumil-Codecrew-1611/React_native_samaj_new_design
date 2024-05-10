import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabs from './src/containers/BottomTabs'
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);


  return (
    <GestureHandlerRootView>
      {/* <SafeAreaProvider> */}
      <NavigationContainer onReady={() => changeNavigationBarColor('white')}>
        <BottomTabs />
      </NavigationContainer>
      <StatusBar barStyle={'dark-content'} />
      {/* </SafeAreaProvider> */}
    </GestureHandlerRootView>
  )
}

export default App

/* import { View, Text } from 'react-native'
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

export default App */