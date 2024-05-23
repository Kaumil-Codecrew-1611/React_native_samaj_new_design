import React, { useContext } from 'react';
import { Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomBottomSheet from '../../../components/CustomBottomSheet';
import { GlobalContext } from '../../../context/globalState';
import SettingBottomSheet from '../Settings';
import ChangePassword from '../ChangePassword'; // Import your change password component

const ProfilePage = ({ navigation, route }) => {
    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);
    const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);
    const { openBottomSheet, setScreenpercentage } = useContext(GlobalContext);

    const openSettings = () => {
        setScreenpercentage({ first: "30%", second: "34%" });
        openBottomSheet(<SettingBottomSheet />);
    };
    const openAddFamilyDetails = () => {
        navigation.navigate('ViewFamilyDetails')
    }

    const openChangePassword = () => {
        // setScreenpercentage({ first: "100%", second: "100%" });
        // openBottomSheet(<ChangePassword />);
        navigation.navigate('ChangePassword')
    };

    const navigateToAddProfile = () => {
        navigation.navigate('AddFamilyDetail');
    };

    const navigateToEditProfile = () => {
        navigation.navigate('EditProfile');
    };
    return (
        <View className="flex-1 bg-white space-y-5 w-full pb-20" edges={['top']}>
            <View className="relative basis-[25%] mb-12">
                <View className="overflow-hidden bg-slate-300">
                    <ImageBackground className="h-full w-full transition-all duration-300 overflow-hidden" source={{ uri: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-3.png" }} alt="bg-image">
                        <View className="h-full bg-[#121a1c50]" />
                    </ImageBackground>
                </View>
                <View className="absolute right-2 top-2 flex w-12 h-12 shadow-lg shadow-white items-center justify-center rounded-full bg-gray-600">
                    <AnimatedFeatherIcon
                        name="log-out"
                        size={25}
                        color="white"
                        className="m-2"
                    />
                </View>
                <View className="absolute p-6 flex h-36 top-20 w-full items-center justify-center -space-x-2 overflow-visible">
                    <View className="h-40 w-40 p-2 rounded-full bg-white">
                        <Image className="inline-block h-36 w-36 rounded-full ring-2 ring-white" source={{ uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }} alt='profile-img' />
                    </View>
                </View>
            </View>
            <View className="basis-[75%]">
                <View className="flex items-center">
                    <Text className="text-rose-700 font-bold text-2xl">Kaumil Patel</Text>
                    <View className="flex flex-row items-center justify-center">
                        <Text className="text-neutral-700 font-normal text-xl tracking-wider">Member Id: </Text>
                        <Text className="text-neutral-700 text-xl font-normal tracking-wider">P1234</Text>
                    </View>
                    <View className="flex flex-row items-center justify-center">
                        <Text className="text-neutral-700 font-normal text-xl tracking-wider">Start Date: </Text>
                        <Text className="text-neutral-700 text-xl font-normal tracking-wider">16-05-2024</Text>
                    </View>
                    <View className="flex-row gap-1">
                        <Pressable hitSlop={20} onPress={navigateToEditProfile}>
                            <Text className="text-blue-600 font-medium text-base">Edit Profile</Text>
                        </Pressable>
                        <Text className="text-blue-600 font-medium text-base">/</Text>
                        <Pressable hitSlop={20} onPress={navigateToAddProfile}>
                            <Text className="text-blue-600 font-medium text-base">Add Profile</Text>
                        </Pressable>
                    </View>
                    {/* <View className="flex flex-row items-center justify-center">
                        <Pressable hitSlop={20} className="flex-row gap-1">
                            <Text className="text-blue-600 font-medium text-base">Edit Profile</Text>
                            <Text className="text-blue-600 font-medium text-base">/</Text>
                            <Text className="text-blue-600 font-medium text-base">Add Profile</Text>
                        </Pressable>
                    </View> */}
                </View>
                <SafeAreaView className="flex-1 h-[2000px] bg-[#e7eaf1] overflow-hidden rounded-t-[50px] mt-7">
                    <ScrollView scrollEnabled={true} nestedScrollEnabled={true} style={styles.scrollView} contentContainerStyle={{ flexGrow: 1 }} className="p-10">
                        <View className="flex flex-col gap-4">
                            <Pressable onPress={openAddFamilyDetails} className="flex flex-row items-center justify-between bg-white p-3 rounded-lg">
                                <View className="flex-row justify-between gap-2 items-center">
                                    <AnimatedFeatherIcon name="users" size={30} />
                                    <Text className="text-neutral-700 font-normal text-xl tracking-wider">Add Family Details</Text>
                                </View>
                                <AnimatedFontistoIcon name="angle-right" size={15} />
                            </Pressable>
                            <Pressable onPress={openSettings} className="flex flex-row items-center justify-between bg-white p-3 rounded-lg">
                                <View className="flex-row justify-between gap-2 items-center">
                                    <AnimatedFontistoIcon name="player-settings" size={30} />
                                    <Text className="text-neutral-700 font-normal text-xl tracking-wider">Settings</Text>
                                </View>
                                <AnimatedFontistoIcon name="angle-right" size={15} />
                            </Pressable>
                            <Pressable onPress={openChangePassword} className="flex flex-row items-center justify-between bg-white p-3 rounded-lg">
                                <View className="flex-row justify-between gap-2 items-center">
                                    <AnimatedFontistoIcon name="locked" size={30} />
                                    <Text className="text-neutral-700 font-normal text-xl tracking-wider">Change Password</Text>
                                </View>
                                <AnimatedFontistoIcon name="angle-right" size={15} />
                            </Pressable>
                            <View className="flex flex-row items-center justify-between bg-white p-3 rounded-lg">
                                <View className="flex-row justify-between gap-2 items-center">
                                    <AnimatedFontistoIcon name="share" size={30} />
                                    <Text className="text-neutral-700 font-normal text-xl tracking-wider">Share App</Text>
                                </View>
                                <AnimatedFontistoIcon name="angle-right" size={15} />
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
            <CustomBottomSheet screenFirstPercentage="30%" screenSecondPercentage="34%" />
        </View>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        marginHorizontal: 2,
    },
    text: {
        fontSize: 42,
    },
});

export default ProfilePage;
