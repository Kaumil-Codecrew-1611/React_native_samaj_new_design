import { View, Text, Dimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/app/Home'

import LoginScreen from '../screens/Login';
import VillageListing from '../screens/app/VillageListing';
import Aboutus from '../screens/app/About';
import News from '../screens/app/News';
// import Profile from '../screens/app/Profile';
import VillageWisePersons from '../screens/app/VillageWisePersons';
import BottomTabs from '../containers/BottomTabs';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GlobalContext } from '../context/globalState';

import FaqsScreen from '../screens/Faqs';
import SettingBottomSheet from '../screens/app/Settings';

const RootStack = createNativeStackNavigator()
const RootNavigator = () => {
    const { SelectedVillage } = useContext(GlobalContext)
    const [listingStyle, setListingStyle] = useState('grid')
    const headerListStyle = (newListingStyle, navigation) => {
        setListingStyle(newListingStyle);
        navigation.navigate('VillageListing', { listingStyle: newListingStyle });
    };
    const { width } = Dimensions.get('window')
    console.log(width, "width")
    return (
        <RootStack.Navigator screenOptions={{
            headerTitleAlign: 'center',
            // headerShown: false
        }}>
            <RootStack.Screen name="TabNavigator" component={BottomTabs} options={{ headerShown: false }} />
            <RootStack.Screen name='Login' component={HomeScreen} />
            <RootStack.Screen name="Faqs" component={FaqsScreen} options={{ headerTitle: 'Faqs' }} />
            <RootStack.Screen name="VillageListing" component={VillageListing} initialParams={{ listingStyle }} options={({ navigation }) => ({
                headerTitle: () => (
                    <View style={{ marginLeft: width - 220 }}>
                        <View className="flex-row p-1 rounded-full bg-slate-300 items-center">
                            <TouchableOpacity className={`text-center px-3 transition-all ${listingStyle == 'grid' ? 'bg-white rounded-full' : ''}`} onPress={() => headerListStyle('grid', navigation)}><Text className={`text-xl font-semibold text-black`}>Grid</Text></TouchableOpacity>

                            <TouchableOpacity className={`text-center px-3 transition-all ${listingStyle == 'view' ? 'bg-white rounded-full' : ''}`} onPress={() => headerListStyle('view', navigation)}><Text className={`text-xl font-semibold text-black `}>View</Text></TouchableOpacity>
                        </View>
                    </View>

                )
            }
            )} />
            <RootStack.Screen name="VillageWisePersons" component={VillageWisePersons} options={{ headerTitle: SelectedVillage || 'Village' }} />
            <RootStack.Screen name="Aboutus" component={Aboutus} options={{ headerTitle: 'Aboutus' }} />
            <RootStack.Screen name="News" component={News} options={{ headerTitle: 'News' }} />
            <RootStack.Screen name="Seetings" component={SettingBottomSheet} options={{ headerTitle: 'Setting' }} />
            <RootStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerTitle: 'Login' }} />
        </RootStack.Navigator>
    )
}

export default RootNavigator