import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomTabs from '../containers/BottomTabs';
import { GlobalContext } from '../context/globalState';
import Aboutus from '../screens/app/About';
import ChangePassword from '../screens/app/ChangePassword';
import EmailSupport from '../screens/app/EmailSupport';
import ViewFamilyTree from '../screens/app/FamilyDetails';
import AddFamilyDetails from '../screens/app/FamilyDetails/AddFamilyDetails';
import NodeDetails from '../screens/app/FamilyDetails/NodeDetails';
import Faqs from '../screens/app/Faqs';
import SelectVillage from '../screens/app/FormWizard/SelectVillage';
import HomeScreen from '../screens/app/Home';
import Login from '../screens/app/Login';
import News from '../screens/app/News';
import Payment from '../screens/app/Payment';
import PaymentFailed from '../screens/app/Payment/PaymentFailed';
import PaymentSuccess from '../screens/app/Payment/PaymentSuccess';
import Register from '../screens/app/Register';
import SettingBottomSheet from '../screens/app/Settings';
import Support from '../screens/app/Support';
import VillageListing from '../screens/app/VillageListing';
import VillageWisePersons from '../screens/app/VillageWisePersons';
import userProfilePage from '../screens/app/Profile/index';
import NewsDetailsPage from '../screens/app/News/NewsDetailsPage';
import NewsList from '../screens/app/News/NewsList';
import EditUserProfile from '../screens/app/Edit User';
import EditUserFamilyDetails from '../screens/app/FamilyDetails/EditUserFamilyDetails/EditUserFamilyDetails';

const RootStack = createNativeStackNavigator()
const RootNavigator = () => {
    const { SelectedVillage } = useContext(GlobalContext)
    const [listingStyle, setListingStyle] = useState('grid')
    const headerListStyle = (newListingStyle, navigation) => {
        setListingStyle(newListingStyle);
        navigation.navigate('VillageListing', { listingStyle: newListingStyle });
    };
    const { width } = Dimensions.get('window')

    return (
        <RootStack.Navigator screenOptions={{
            headerTitleAlign: 'center',

            // headerShown: false
        }}>
            <RootStack.Screen name="TabNavigator" component={BottomTabs} options={{ headerShown: false }} />
            <RootStack.Screen name='HomeScreen' component={HomeScreen} />

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
            <RootStack.Screen name="Aboutus" component={Aboutus} options={{ headerTitle: 'About Us' }} />
            <RootStack.Screen name="NewsList" component={NewsList} options={{ headerTitle: 'News List' }} />
            <RootStack.Screen name="NewsDetailsPage" component={NewsDetailsPage} options={{ headerTitle: 'News Details' }} />
            <RootStack.Screen name="userProfilePage" component={userProfilePage} options={{ headerTitle: 'User Profile Page' }} />
            <RootStack.Screen name="News" component={News} options={{ headerTitle: 'News' }} />
            <RootStack.Screen name="Support" options={{ headerTitle: 'Support Page' }} component={Support} />
            <RootStack.Screen name="Seetings" component={SettingBottomSheet} options={{ headerTitle: 'Setting' }} />
            <RootStack.Screen name="EmailSupport" component={EmailSupport} options={{ headerTitle: 'Email Support' }} />
            <RootStack.Screen name="Faqs" component={Faqs} options={{ headerTitle: 'Faqs' }} />
            <RootStack.Screen name="ChangePassword" component={ChangePassword} options={{ headerTitle: 'Change Password' }} />
            <RootStack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />
            <RootStack.Screen name="Register" component={Register} options={{ headerTitle: 'Register Page' }} />
            <RootStack.Screen name="EditUserProfile" component={EditUserProfile} options={{ headerTitle: 'Edit User Profile' }} />
            <RootStack.Screen name="Payment" component={Payment} options={{ headerTitle: 'Payment Page' }} />
            <RootStack.Screen name="PaymentSuccess" component={PaymentSuccess} options={{ headerTitle: 'Payment Page' }} />
            <RootStack.Screen name="PaymentFailed" component={PaymentFailed} options={{ headerTitle: 'Payment Page' }} />
            <RootStack.Screen name="select_village" options={{ headerTitle: 'Register Page' }} component={SelectVillage} />
            <RootStack.Screen name="ViewFamilyDetails" options={{ headerTitle: 'Family Details' }} component={ViewFamilyTree} />
            <RootStack.Screen name="NodeDetails" component={NodeDetails} options={{ headerTitle: 'Family Details' }} />
            <RootStack.Screen name="AddFamilyDetail" component={AddFamilyDetails} options={{ headerTitle: 'Add Family Details' }} />
            <RootStack.Screen name="EditUserFamilyDetails" component={EditUserFamilyDetails} options={{ headerTitle: 'Edit Family Details' }} />
        </RootStack.Navigator>
    )
}

export default RootNavigator