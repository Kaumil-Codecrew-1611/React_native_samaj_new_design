import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Image, View, Text, ScrollView, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import SettingBottomSheet from '../Settings';
import BottomSheet from '@gorhom/bottom-sheet';

const ProfilePage = ({ navigation, route }) => {
    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);
    const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

    const bottomSheetRef = useRef(null);

    // Memoize the bottom sheet snapPoints
    const snapPoints = useMemo(() => ['30%', '34%'], []);

    // Callback to handle bottom sheet visibility
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
        if (index === -1) {
            setIsBottomSheetVisible(false);
        }
    }, []);

    // Callback to open the bottom sheet
    const NavigateSettingScreen = () => {
        setIsBottomSheetVisible(true);
    };
    return (

        <View className="flex-1 bg-white space-y-5 w-full pb-20" edges={['top']}>
            <View className="relative basis-[25%] mb-12">
                <View className="overflow-hidden bg-slate-300  ">
                    <ImageBackground className="h-full w-full transition-all duration-300  overflow-hidden  " source={{ uri: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-3.png" }} alt="bg-image" >
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
                <View className="absolute p-6 flex h-36 top-20 w-full items-center  justify-center -space-x-2 overflow-visible" >
                    <View className="h-40 w-40 p-2 rounded-full bg-white">
                        <Image className="inline-block h-36 w-36  rounded-full ring-2 ring-white" source={{ uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }} alt='profile-img' />
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
                    <View className="flex flex-row items-center justify-center">

                        <Pressable hitSlop={20}>
                            <Text className="text-blue-600 font-medium text-base" >Edit Profile</Text>
                        </Pressable>

                    </View>
                </View>
                <SafeAreaView className="flex-1 h-[2000px] bg-[#e7eaf1] overflow-hidden rounded-t-[50px] mt-7">
                    {/* <View className=" h-[2000px] bg-[#e7eaf1] overflow-hidden rounded-t-[50px] mt-7"> */}
                    <ScrollView scrollEnabled={true}
                        nestedScrollEnabled={true} style={styles.scrollView} contentContainerStyle={{ flexGrow: 1 }} className="p-10">
                        <View className="flex flex-col gap-4">
                            <View className="flex flex-row items-center justify-between bg-white p-3 rounded-lg">
                                <View className="flex-row justify-between gap-2 items-center">
                                    <AnimatedFeatherIcon
                                        name="users"
                                        size={30}

                                    />
                                    <Text className="text-neutral-700 font-normal text-xl tracking-wider">Add Family Details</Text>
                                </View>

                                <AnimatedFontistoIcon
                                    name="angle-right"
                                    size={15}
                                />

                            </View>
                            <Pressable onPress={NavigateSettingScreen} className="flex flex-row items-center justify-between bg-white p-3 rounded-lg">
                                {/* <Pressable onPress={() => navigation.navigate("Seetings")} className="flex-row justify-between gap-2 items-center"> */}
                                <View className="flex-row justify-between gap-2 items-center">
                                    <AnimatedFontistoIcon
                                        name="player-settings"
                                        size={30}

                                    />
                                    <Text className="text-neutral-700 font-normal text-xl tracking-wider">Settings</Text>
                                </View>

                                <AnimatedFontistoIcon
                                    name="angle-right"
                                    size={15}
                                />

                            </Pressable>
                            <View className="flex flex-row items-center justify-between bg-white p-3 rounded-lg">
                                <View className="flex-row justify-between gap-2 items-center">
                                    <AnimatedFontistoIcon
                                        name="locked"
                                        size={30}

                                    />
                                    <Text className="text-neutral-700 font-normal text-xl tracking-wider">Change Password</Text>
                                </View>

                                <AnimatedFontistoIcon
                                    name="angle-right"
                                    size={15}
                                />

                            </View>
                            <View className="flex flex-row items-center justify-between bg-white p-3 rounded-lg">
                                <View className="flex-row justify-between gap-2 items-center">
                                    <AnimatedFontistoIcon
                                        name="share"
                                        size={30}

                                    />
                                    <Text className="text-neutral-700 font-normal text-xl tracking-wider">Share App</Text>
                                </View>

                                <AnimatedFontistoIcon
                                    name="angle-right"
                                    size={15}
                                />

                            </View>
                        </View>
                        {/* <Text style={styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </Text> */}
                    </ScrollView>
                    {/* </View> */}
                </SafeAreaView>
                {/*  <ScrollView className="p-10 ">
                      <View className=""> 
                        <Text className="text-neutral-700 font-normal text-xl tracking-wider">Helloooo</Text>
                        <Text className="text-neutral-700 font-normal text-xl tracking-wider">Helloooo</Text>
                       
                        </View>
                    </ScrollView> */}

            </View>
            <BottomSheet
                aria-label='Setting Bottom Sheet'
                ref={bottomSheetRef}
                index={isBottomSheetVisible ? 0 : -1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enablePanDownToClose
                detached={true}
            >
                <SettingBottomSheet />
            </BottomSheet>
        </View >
    )
}
const styles = StyleSheet.create({

    scrollView: {
        marginHorizontal: 2,
    },
    text: {
        fontSize: 42,
    },

});
export default ProfilePage;

