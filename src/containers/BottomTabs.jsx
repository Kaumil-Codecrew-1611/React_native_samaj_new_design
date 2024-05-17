import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTab from '../components/shared/BottomTabs/CustomBottomTab';
import Favourites from '../screens/FavoriteScreen';
import LoginScreen from '../screens/Login';
import Home from '../screens/app/Home';
import Member from '../screens/app/Member';
// import Profile from '../screens/app/Profile';
import React, { lazy, Suspense } from 'react';
import ProfilePage from '../screens/app/Profile';
import ContectUs from '../screens/app/Contactus';
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    const isLoggedIn = true;
    return (
        <Tab.Navigator sceneContainerStyle={{ backgroundColor: "#FCFCFC" }} tabBar={props => <CustomBottomTab {...props} />}>
            <Tab.Group
                screenOptions={{
                    headerShown: false,
                }}>
                <Tab.Screen
                    options={{ tabBarLabel: 'Home' }}
                    name="Home"
                    component={Home}
                />
                <Tab.Screen
                    options={{ tabBarLabel: 'Members' }}
                    name="Member"
                    component={Member}
                />
                {isLoggedIn && <Tab.Screen
                    options={{ tabBarLabel: 'Profile' }}
                    name="Profile"
                    component={ProfilePage}
                />}
                {!isLoggedIn && <Tab.Screen
                    options={{ tabBarLabel: 'Auth' }}
                    name="Auth"
                    component={LoginScreen}
                />}
                <Tab.Screen
                    options={{ tabBarLabel: 'Contactus' }}
                    name="Contactus"
                    component={ContectUs}
                />
            </Tab.Group>
        </Tab.Navigator>
    );
};
export default BottomTabs;