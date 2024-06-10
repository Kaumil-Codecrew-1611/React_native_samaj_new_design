import React, { useContext, useState } from 'react';
import { Image, ImageBackground, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Share } from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomBottomSheet from '../../../components/CustomBottomSheet';
import { GlobalContext } from '../../../context/globalState';
import SettingBottomSheet from '../Settings';
import ApiContext from '../../../context/ApiContext';
import { withTiming } from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';


const ProfilePage = ({ navigation }) => {
    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);
    const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);
    const { openBottomSheet, setScreenpercentage, setuserDataInStorage, allUserInfo, progress } = useContext(GlobalContext);
    const [isVisible, setIsVisible] = useState(false);
    const [isBannerVisible, setBannerIsVisible] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isBannerPopupVisible, setIsBannerPopupVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const { updateUserProfileImage, updateUserBannerProfileImage } = useContext(ApiContext);

    const profileImage = [
        { uri: `${process.env.IMAGE_URL}${allUserInfo?.photo}`, },
    ];
    const bannerImages = [
        { uri: `${process.env.IMAGE_URL}${allUserInfo?.profile_banner}`, },
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
        navigation.navigate('EditUserProfile');
    };

    const handleLogout = async () => {
        progress.value = withTiming("1");
        await setuserDataInStorage('user', null);
        navigation.navigate("Home");
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
    const openBannerModal = () => {
        setIsBannerPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };
    const closeBannerPopup = () => {
        setIsBannerPopupVisible(false);
    };

    const viewProfileImage = () => {
        closePopup();
        setIsVisible(true);
    };
    const viewBannerImage = () => {
        closeBannerPopup();
        setBannerIsVisible(true);
    };

    const openLogoutModal = async () => {
        setModalVisible(true)
    };

    const closeLogoutModal = async () => {
        setModalVisible(false)
    };

    const selectImage = async () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(async (image) => {
            const filePath = image.path;
            const imageName = filePath.substring(filePath.lastIndexOf('/') + 1);
            const userData = new FormData();
            const imagePath = image.path;
            const fileName = imageName;
            const fileType = image.mime;

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
            await setuserDataInStorage('user', response.userData);
            navigation.navigate('Profile');
        }).catch((error) => {
            console.log(error, "errorChangingImage")
        });
    }
    const selectBannerImage = async () => {
        ImagePicker.openPicker({
            width: 1600,
            height: 900,
            cropping: true,
        }).then(async (image) => {
            const filePath = image.path;
            const imageName = filePath.substring(filePath.lastIndexOf('/') + 1);
            const userData = new FormData();
            const imagePath = image.path;
            const fileName = imageName;
            const fileType = image.mime;

            userData.append('image', {
                uri: imagePath,
                type: fileType,
                name: fileName,
            });

            const payload = {
                id: allUserInfo?._id,
                userData
            };
            const response = await updateUserBannerProfileImage(payload);
            setIsBannerPopupVisible(false);
            await setuserDataInStorage('user', response.userData);
            navigation.navigate('Profile');
        }).catch((error) => {
            console.log(error, "errorChangingImage")
        });
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
        <>
            <View className="flex-1 bg-white space-y-5 w-full pb-20" edges={['top']}>
                <View className="relative basis-[25%] mb-12">
                    <Pressable onPress={openBannerModal}>
                        <View className="overflow-hidden bg-slate-300">
                            <ImageBackground className="h-full w-full transition-all duration-300 overflow-hidden" source={{ uri: `${process.env.IMAGE_URL}${allUserInfo?.profile_banner}` }} alt="bg-image">
                                <View className="h-full bg-[#121a1c50]" />
                            </ImageBackground>
                        </View>
                    </Pressable>
                    <Pressable onPress={openLogoutModal} className="absolute right-2 top-2 flex w-12 h-12 shadow-lg shadow-white items-center justify-center rounded-full bg-gray-600">
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
                                <Image className="inline-block h-36 w-36 rounded-full ring-2 ring-white" source={{ uri: process.env.IMAGE_URL + allUserInfo?.photo ? process.env.IMAGE_URL + allUserInfo?.photo : 'https://eclatsuperior.com/wp-content/uploads/2021/04/man4.jpg' }} alt='profile-img' />
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
                    images={profileImage}
                    imageIndex={0}
                    visible={isVisible}
                    onRequestClose={() => setIsVisible(false)}
                />
                <ImageViewing
                    images={bannerImages}
                    imageIndex={0}
                    visible={isBannerVisible}
                    onRequestClose={() => setBannerIsVisible(false)}
                />
                <CustomBottomSheet screenFirstPercentage="30%" screenSecondPercentage="34%" />
            </View>
            <Modal
                transparent={true}
                visible={isPopupVisible}
                onRequestClose={closePopup}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.popup}>
                        <TouchableOpacity onPress={viewProfileImage}>
                            <Text style={styles.popupText}>View Profile Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={selectImage}>
                            <Text style={styles.popupText}>Edit Profile Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={closePopup}>
                            <Text style={styles.popupText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slideTop"
                onRequestClose={closeLogoutModal}
            >
                <View className="flex-1 justify-top items-center">
                    {modalVisible && (
                        <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                    )}
                    <View className="w-4/5 bg-white rounded-[15px] p-4 shadow-lg mt-[90%]">
                        <Text className="font-bold text-lg mb-4">Are you sure you want to logout?</Text>
                        <View className="flex-row justify-between items-center">
                            <Pressable onPress={closeLogoutModal} className="px-6 py-2 bg-gray-200 rounded-[15px] mr-2">
                                <Text>Cancel</Text>
                            </Pressable>
                            <Pressable onPress={() => handleLogout()} className="px-6 py-2 bg-red-500 rounded-[15px]">
                                <Text className="text-white">Logout</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                transparent={true}
                visible={isBannerPopupVisible}
                onRequestClose={closeBannerPopup}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.popup}>
                        <TouchableOpacity onPress={viewBannerImage}>
                            <Text style={styles.popupText}>View Banner Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={selectBannerImage}>
                            <Text style={styles.popupText}>Edit Banner Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={closeBannerPopup}>
                            <Text style={styles.popupText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
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
        color: "black",
        fontSize: 18,
        padding: 10,
    },
});

export default ProfilePage;
