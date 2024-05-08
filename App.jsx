import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabs from './src/containers/BottomTabs'
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
const App = () => {
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