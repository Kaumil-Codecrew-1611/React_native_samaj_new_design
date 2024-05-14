import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/app/Home'
import DirectoryScreen from '../screens/Directory/index';
import LoginScreen from '../screens/Login';
import VillageListing from '../screens/app/VillageListing';
import Aboutus from '../screens/app/About';
import News from '../screens/app/News';
import Profile from '../screens/app/Profile';
const RootStack = createNativeStackNavigator()
const RootNavigator = () => {
    return (
        <RootStack.Navigator screenOptions={{
            headerTitleAlign: 'center',
        }}>
            <RootStack.Screen name='Home' component={HomeScreen} />
            <RootStack.Screen name='Login' component={HomeScreen} />
            <RootStack.Screen name="DirectoryScreen" component={DirectoryScreen} options={{ headerTitle: 'Directory' }} />
            <RootStack.Screen name="VillageListing" component={VillageListing} options={{ headerTitle: 'Villages' }} />
            <RootStack.Screen name="Aboutus" component={Aboutus} options={{ headerTitle: 'Aboutus' }} />
            <RootStack.Screen name="News" component={News} options={{ headerTitle: 'News' }} />
            <RootStack.Screen name="Profile" component={Profile} options={{ headerTitle: 'Profile' }} />
            <RootStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerTitle: 'Login' }} />
        </RootStack.Navigator>
    )
}

export default RootNavigator