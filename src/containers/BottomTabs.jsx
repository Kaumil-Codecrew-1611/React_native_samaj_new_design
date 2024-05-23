import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTab from '../components/shared/BottomTabs/CustomBottomTab';
import LoginScreen from '../screens/Login';
import ContactUs from '../screens/app/Contactus';
import Home from '../screens/app/Home';
import Member from '../screens/app/Member';
import ProfilePage from '../screens/app/Profile';
import Welcome from '../screens/app/WelcomeScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    const isLoggedIn = false;

    // const { keyboardVisible } = useContext(GlobalContext);
    return (
        <Tab.Navigator
            sceneContainerStyle={{ backgroundColor: "#FCFCFC" }}
            tabBar={props => <CustomBottomTab {...props} />}
            screenOptions={{
                // tabBarStyle: { position: 'absolute', bottom: 0 },
                tabBarHideOnKeyboard: true,
                // tabBarHideOnPress: true,
            }}
        >
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
                {!isLoggedIn && <Tab.Screen options={{ tabBarLabel: 'Auth', tabBarStyle: { display: 'none' } }} name="Auth" component={Welcome} />}
                < Tab.Screen
                    options={{ tabBarLabel: 'Contactus' }}
                    name="Contactus"
                    component={ContactUs}
                />
            </Tab.Group>
        </Tab.Navigator>
    );
};
export default BottomTabs;
