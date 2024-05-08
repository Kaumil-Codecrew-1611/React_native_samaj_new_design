import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Setting from '../screens/Setting';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"

const Tab = createBottomTabNavigator();

const TabBar = [
    { route: 'Home', label: 'Home', type: 'Icons.Ionicons', activeIcon: 'home', }
]
const MyTabs = () => {

    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false // Hide the labels
        }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                headerShown: false,
                tabBarIcon(props) {
                    return <FontAwesomeIcon name="home" {...props} />
                }
            }} />
            <Tab.Screen name="Settings" component={Setting} options={{
                headerShown: false,
                tabBarIcon(props) {
                    return <FontAwesomeIcon name="gear" {...props} /> // Change "setting" to "gear"
                }
            }} />
        </Tab.Navigator>
    );
}

export default MyTabs;
