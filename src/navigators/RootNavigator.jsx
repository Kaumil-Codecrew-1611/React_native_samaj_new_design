import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/app/Home'
import DirectoryScreen from '../screens/Directory/index';
import LoginScreen from '../screens/Login';
const RootStack = createNativeStackNavigator()
const RootNavigator = () => {
    return (
        <RootStack.Navigator screenOptions={{
            headerTitleAlign: 'center', // Align the title to the center
        }}>
            <RootStack.Screen name='Home' component={HomeScreen} />
            <RootStack.Screen name='Login' component={HomeScreen} />
            <RootStack.Screen name="DirectoryScreen" component={DirectoryScreen}  options={{ headerTitle: 'Directory' }}/>
            <RootStack.Screen name="LoginScreen" component={LoginScreen}  options={{ headerTitle: 'Login' }}/>
        </RootStack.Navigator>
    )
}

export default RootNavigator