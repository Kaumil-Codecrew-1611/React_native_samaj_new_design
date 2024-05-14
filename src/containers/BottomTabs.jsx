import CustomBottomTab from '../components/shared/BottomTabs/CustomBottomTab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Products from '../screens/Products';
import Cart from '../screens/Carts';
import Favourites from '../screens/FavoriteScreen';
import Profile from '../screens/Profile';
import Home from '../screens/app/Home';
import RootNavigator from '../navigators/RootNavigator';
import VillageListing from '../screens/app/VillageListing';
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
                    options={{ tabBarLabel: 'Members' }}
                    name="Members"
                    component={Cart}
                />
                {isLoggedIn && <Tab.Screen
                    options={{ tabBarLabel: 'Profile' }}
                    name="Profile"
                    component={Profile}
                />}
                {!isLoggedIn && <Tab.Screen
                    options={{ tabBarLabel: 'Auth' }}
                    name="Auth"
                    component={Favourites}
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