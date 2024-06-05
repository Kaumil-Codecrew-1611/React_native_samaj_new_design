import React, { useContext, useState } from 'react';
import { Image, ImageBackground, Modal, PermissionsAndroid, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,Share } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import ImageViewing from 'react-native-image-viewing';
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomBottomSheet from '../../../components/CustomBottomSheet';
import { GlobalContext } from '../../../context/globalState';
import SettingBottomSheet from '../Settings';
import ApiContext from '../../../context/ApiContext';

const ProfilePage = ({ navigation }) => {
    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);
    const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);
    const { openBottomSheet, setScreenpercentage, setuserDataInStorage, allUserInfo, setAllUserInfo } = useContext(GlobalContext);
    // const { setuserDataInStorage, progress, setIsLoggedIn, getUserDataFromStorage, setAllUserInfo } = useContext(GlobalContext);

    const [isVisible, setIsVisible] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const { updateUserProfileImage } = useContext(ApiContext);
    const images = [
        { uri: `${process.env.IMAGE_URL}${allUserInfo?.photo}`, },
    ];

    const openSettings = () => {
        setScreenpercentage({ first: "30%", second: "34%" });
        openBottomSheet(<SettingBottomSheet />);
    };

    const openAddFamilyDetails = () => {
        navigation.navigate('ViewFamilyDetails');
    };

    const openChangePassword = () => {
        navigation.navigate('ChangePassword');
    };

    const navigateToAddProfile = () => {
        const parent_id = allUserInfo?._id;
        navigation.navigate('AddFamilyDetail', { parent_id: parent_id });
    };

    const navigateToEditProfile = () => {
        navigation.navigate('EditProfile');
    };

    const handleLogout = async () => {
        await setuserDataInStorage('user', null);
        navigation.navigate("Login");
    };

    const formatDate = (timestamp) => {
        if (!timestamp) {
            return 'Invalid date';
        }
        const date = new Date(Number(timestamp));
        if (isNaN(date)) {
            return 'Invalid date';
        }
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`;
    };

    const openModal = () => {
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    const viewProfileImage = () => {
        closePopup();
        setIsVisible(true);
    };

    const selectImage = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                ]);

                const cameraPermission = granted['android.permission.CAMERA'];
                const writePermission = granted['android.permission.WRITE_EXTERNAL_STORAGE'];
                const readPermission = granted['android.permission.READ_EXTERNAL_STORAGE'];

                if (cameraPermission === PermissionsAndroid.RESULTS.GRANTED &&
                    writePermission === PermissionsAndroid.RESULTS.GRANTED &&
                    readPermission === PermissionsAndroid.RESULTS.GRANTED) {

                    const result = await ImagePicker.launchImageLibrary({
                        selectionLimit: 1,
                        mediaType: 'photo',
                        includeBase64: true,
                    });

                    if (result.didCancel) {
                        console.log("User canceled ImagePicker");
                    } else if (result.errorCode) {
                        console.error('ImagePicker Error: ', result.errorMessage);
                    } else {
                        const image = result.assets[0];
                        const userData = new FormData();
                        const imagePath = image.uri;
                        const fileName = image.fileName;
                        const fileType = image.type;

                        userData.append('image', {
                            uri: imagePath,
                            type: fileType,
                            name: fileName,
                        });

                        const payload = {
                            id: allUserInfo?._id,
                            userData
                        };
                        const response = await updateUserProfileImage(payload);
                        setIsPopupVisible(false);
                        await setAllUserInfo("")
                        await setAllUserInfo(response)
                        console.log(response, "responseresponseresponse ");
                    }
                } else {
                    console.log("Camera or storage permission denied");
                }
            } else {
                const result = await ImagePicker.launchImageLibrary({
                    selectionLimit: 1,
                    mediaType: 'photo',
                    includeBase64: true,
                });

                if (result.didCancel) {
                    console.log("User canceled ImagePicker");
                } else if (result.errorCode) {
                    console.error('ImagePicker Error: ', result.errorMessage);
                } else {
                    const image = result.assets[0];
                    const userData = new FormData();
                    const imagePath = image.uri;
                    const fileName = image.fileName;
                    const fileType = image.type;

                    userData.append('image', {
                        uri: imagePath,
                        type: fileType,
                        name: fileName,
                    });
                    const payload = {
                        id: allUserInfo?._id,
                        userData
                    };
                    await updateUserProfileImage(payload);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const appUrl = 'https://play.google.com/store/apps/details?id=com.panchal_application&pcampaignid=web_share';
    const handleShare = async () => {
      try {
        const result = await Share.share({
          message: `Check out this awesome app: ${appUrl}`,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // Shared with activity type of result.activityType
          } else {
            // Shared
          }
        } else if (result.action === Share.dismissedAction) {
          // Dismissed
        }
      } catch (error) {
        console.error('Error sharing:', error.message);
      }
    };

    return (
        <View className="flex-1 bg-white space-y-5 w-full pb-20" edges={['top']}>
            <View className="relative basis-[25%] mb-12">
                <View className="overflow-hidden bg-slate-300">
                    <ImageBackground className="h-full w-full transition-all duration-300 overflow-hidden" source={{ uri: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-3.png" }} alt="bg-image">
                        <View className="h-full bg-[#121a1c50]" />
                    </ImageBackground>
                </View>
                <Pressable onPress={handleLogout} className="absolute right-2 top-2 flex w-12 h-12 shadow-lg shadow-white items-center justify-center rounded-full bg-gray-600">
                    <AnimatedFeatherIcon
                        name="log-out"
                        size={25}
                        color="white"
                        className="m-2"
                    />
                </Pressable>
                <View className="absolute p-6 flex h-36 top-20 w-full items-center justify-center -space-x-2 overflow-visible">
                    <Pressable onPress={openModal}>
                        <View className="h-40 w-40 p-2 rounded-full bg-white">
                            <Image className="inline-block h-36 w-36 rounded-full ring-2 ring-white" source={{ uri: process.env.IMAGE_URL + allUserInfo?.photo }} alt='profile-img' />
                        </View>
                    </Pressable>
                </View>
            </View>
            <View className="basis-[75%]">
                <View className="flex items-center">
                    <Text className="text-rose-700 font-bold text-2xl">{allUserInfo?.firstname} {allUserInfo?.lastname}</Text>
                    <View className="flex flex-row items-center justify-center">
                        <Text className="text-neutral-700 font-normal text-xl tracking-wider">Member Id: </Text>
                        <Text className="text-rose-700 text-xl font-bold tracking-wider">{allUserInfo?.personal_id}</Text>
                    </View>
                    <View className="flex flex-row items-center justify-center">
                        <Text className="text-neutral-700 font-normal text-xl tracking-wider">Start Date: </Text>
                        <Text className="text-rose-700 text-xl font-bold tracking-wider">{formatDate(allUserInfo?.created_at)}</Text>
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
                            <Pressable onPress={handleShare}>
                            <View className="flex flex-row items-center justify-between bg-white p-3 rounded-lg">
                                <View className="flex-row justify-between gap-2 items-center">
                                    <AnimatedFontistoIcon name="share" size={30} />
                                    <Text className="text-neutral-700 font-normal text-xl tracking-wider">Share App</Text>
                                </View>
                                <AnimatedFontistoIcon name="angle-right" size={15} />
                            </View>
                            </Pressable>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
            <ImageViewing
                images={images}
                imageIndex={0}
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
            />
            <CustomBottomSheet screenFirstPercentage="30%" screenSecondPercentage="34%" />

            <Modal
                transparent={true}
                visible={isPopupVisible}
                onRequestClose={closePopup}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.popup}>
                        <TouchableOpacity onPress={viewProfileImage}>
                            <Text style={styles.popupText}>View Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={selectImage}>
                            <Text style={styles.popupText}>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={closePopup}>
                            <Text style={styles.popupText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popup: {
        width: 250,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    popupText: {
        fontSize: 18,
        padding: 10,
    },
});

export default ProfilePage;
