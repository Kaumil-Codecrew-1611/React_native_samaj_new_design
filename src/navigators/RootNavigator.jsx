import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import MyTabs from './TabsNavigator'
const RootStack = createNativeStackNavigator()
const RootNavigator = () => {
    return (
        <RootStack.Navigator screenOptions={{
            headerTitleAlign: 'center',
        }}>
            <RootStack.Screen name="Tabs" component={MyTabs} options={{ headerShown: false }}></RootStack.Screen>
            <RootStack.Screen name='Home' component={HomeScreen} />
            <RootStack.Screen name='Login' component={HomeScreen} />
        </RootStack.Navigator>
    )
}

export default RootNavigator