import CustomBottomTab from '../components/shared/BottomTabs/CustomBottomTab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Products from '../screens/Products';
import Cart from '../screens/Carts';
import Favourites from '../screens/FavoriteScreen';
import Home from '../screens/app/Home';
import RootNavigator from '../navigators/RootNavigator';
import VillageListing from '../screens/app/VillageListing';
import LoginScreen from '../screens/Login';
import Member from '../screens/app/Member';
import Profile from '../screens/app/Profile';
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    const isLoggedIn = false;
    return (
        <Tab.Navigator sceneContainerStyle={{ backgroundColor: "#FCFCFC" }} tabBar={props => <CustomBottomTab {...props} />}>
            <Tab.Group
                screenOptions={{
                    headerShown: false,
                }}>
                <Tab.Screen
                    options={{ tabBarLabel: 'Home' }}
                    name="Home"
                    component={RootNavigator}
                />
                <Tab.Screen
                    options={{ tabBarLabel: 'Member' }}
                    name="Member"
                    component={Member}
                />
                {isLoggedIn && <Tab.Screen
                    options={{ tabBarLabel: 'Profile' }}
                    name="Profile"
                    component={Profile}
                />}
                {!isLoggedIn && <Tab.Screen
                    options={{ tabBarLabel: 'Auth' }}
                    name="Auth"
                    component={LoginScreen}
                />}
                <Tab.Screen
                    options={{ tabBarLabel: 'More Details' }}
                    name="More"
                    component={VillageListing}
                />
            </Tab.Group>
        </Tab.Navigator>
    );
};
export default BottomTabs;