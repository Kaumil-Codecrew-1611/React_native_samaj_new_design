import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Setting from '../screens/Setting';
import FavoriteScreen from '../screens/FavoriteScreen';
import Profile from '../screens/Profile';
const Tabs = createBottomTabNavigator()
const BottomTabs = () => {
    return (
        <Tabs.Navigator>
            <Tabs.Group screenOptions={{
                headerShown: false
            }}>
                <Tabs.Screen options={{ tabBarLabel: 'Home' }} name='Home' component={HomeScreen}></Tabs.Screen>
                <Tabs.Screen options={{ tabBarLabel: 'Setting' }} name='Setting' component={Setting}></Tabs.Screen>
                <Tabs.Screen options={{ tabBarLabel: 'Favorite' }} name='Favorite' component={FavoriteScreen}></Tabs.Screen>
                <Tabs.Screen options={{ tabBarLabel: 'Profile' }} name='Profile' component={Profile}></Tabs.Screen>
            </Tabs.Group>
        </Tabs.Navigator>
    )
}

export default BottomTabs