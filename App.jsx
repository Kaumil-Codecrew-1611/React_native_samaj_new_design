import React, { useContext, useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import SplashScreen from 'react-native-splash-screen';
import { GlobalContext, GlobalProvider } from './src/context/globalState';
import RootNavigator from './src/navigators/RootNavigator';
import { KeyboardAvoidingView, NativeBaseProvider } from 'native-base';
import { PaperProvider } from 'react-native-paper';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const { setIsAuthScreenActive } = useContext(GlobalContext);
  const getActiveRouteName = (state) => {
    const route = state.routes[state.index];

    // Dive into nested navigators
    if (route.state) {
      return getActiveRouteName(route.state);
    }

    return route.name;
  };
  const handleStateChange = (state) => {
    const currentRoute = getActiveRouteName(state);

    setIsAuthScreenActive(currentRoute === 'Auth');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider>
          <NativeBaseProvider>
            <NavigationContainer
              onReady={() => changeNavigationBarColor('white')}
              onStateChange={handleStateChange}
            >
              <RootNavigator />
            </NavigationContainer>
          </NativeBaseProvider>
        </PaperProvider>
        <StatusBar barStyle={'dark-content'} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
