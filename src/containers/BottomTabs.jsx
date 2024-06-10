import React, { useContext, useEffect, useState } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTab from '../components/shared/BottomTabs/CustomBottomTab';
import { GlobalContext } from '../context/globalState';
import ContactUs from '../screens/app/Contactus';
import Home from '../screens/app/Home';
import Member from '../screens/app/Member';
import ProfilePage from '../screens/app/Profile';
import Welcome from '../screens/app/WelcomeScreen';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    const { t } = useTranslation();
    const { isLoggedIn } = useContext(GlobalContext);
    // const [isLoggedIn, setIsLoggedIn] = useState(false)


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
                    options={{ tabBarLabel: t("home") }}
                    name="Home"
                    component={Home}
                />
                <Tab.Screen
                    options={{ tabBarLabel: t('Members') }}
                    name="Member"
                    component={Member}
                />
                {!!isLoggedIn && <Tab.Screen
                    options={{ tabBarLabel: t("profile") }}
                    name="Profile"
                    component={ProfilePage}
                />}
                {!isLoggedIn && <Tab.Screen options={{ tabBarLabel: 'Auth', tabBarStyle: { display: 'none' } }}
                    name="Auth"
                    component={Welcome}
                />}
                < Tab.Screen
                    options={{ tabBarLabel: t("Contactus") }}
                    name="Contactus"
                    component={ContactUs}
                />
            </Tab.Group>
        </Tab.Navigator>
    );
};
export default BottomTabs;
