import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import React, { useContext, useEffect } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { GlobalContext } from './src/context/globalState';
import RootNavigator from './src/navigators/RootNavigator';
import messaging from '@react-native-firebase/messaging';
import { Root } from 'popup-ui'
const App = () => {
  const { setIsAuthScreenActive, getUserDataFromStorage } = useContext(GlobalContext);
  useEffect(() => {
    SplashScreen.hide();
    getDataFromStorage();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onTokenRefresh(token => {
      console.log('New token:', token);
    });

    messaging()
      .getToken()
      .then(token => {
        console.log('Device token:', token);
      });

    return unsubscribe;
  }, []);

  async function getDataFromStorage() {
    await getUserDataFromStorage('user');
  }

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
      <Root>
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
      </Root>
    </GestureHandlerRootView>
  );
};

export default App;
