import React, { useContext, useEffect, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, Text, View, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';
import Animated from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ApiContext from '../../../context/ApiContext';
import ImageViewing from 'react-native-image-viewing';
import * as ImagePicker from 'react-native-image-picker';

const NodeDetails = ({ navigation, route }) => {
    var { userId } = route.params;
    console.log(userId, "userid")
    const { userDataByParentId, handleDeleteProfileUser, updateUserProfileImage } = useContext(ApiContext);
    const [userData, setUserData] = useState([]);
    const [newImagae, setImage] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const AnimatedFontAwesomeIcon = Animated.createAnimatedComponent(FontAwesome);
    const images = [
        { uri: `${process.env.IMAGE_URL}${userData?.photo}`, },
    ];

    useEffect(() => {
        (async function () {

            const contentUserDataById = await userDataByParentId(userId);
            setUserData(contentUserDataById);
        })();
    }, []);

    const filteredUserData = Object.keys(userData)
        .filter(key => key !== '_id' && key !== 'firstname' && key !== 'lastname' && key !== '__v' && key !== 'created_at' && key !== 'deleted_at' && key !== 'updated_at' && key !== 'device_token' && key !== 'payment_id' && key !== 'email' && key !== 'photo' && key !== 'address' && key !== 'relationship' && key !== 'parent_id' && key !== "password" && key !== "locations_id" && key !== "personal_id" && key !== "")
        .reduce((obj, key) => {
            obj[key] = userData[key];
            return obj;
        }, {});

    if (filteredUserData.dob) {
        const dobDate = new Date(filteredUserData.dob);
        filteredUserData.dob = dobDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    const handleAddFamilyDetail = () => {
        navigation.navigate('AddFamilyDetail', { parent_id: userData._id });
    };

    const handleDelete = async (user_Id) => {
        await handleDeleteProfileUser(user_Id)
        navigation.navigate('ViewFamilyDetails');
    };

    const openDeleteModal = () => {
        setModalVisible(true);
    };

    const openUserEditScreen = () => {

        navigation.navigate('EditUserFamilyDetails', { userId: userId });
    };

    const closeDeleteModal = () => {
        setModalVisible(false);
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
                        const userUpdatedData = new FormData();
                        const imagePath = image.uri;
                        const fileName = image.fileName;
                        const fileType = image.type;

                        userUpdatedData.append('image', {
                            uri: imagePath,
                            type: fileType,
                            name: fileName,
                        });
                        const userData = userUpdatedData;
                        const payload = {
                            id: userId,
                            userData
                        };
                        const response = await updateUserProfileImage(payload);
                        console.log(response)
                        if (response) {
                            setImage(response.userData.photo)
                            setIsPopupVisible(false);
                            navigation.navigate('NodeDetails', { userId: userId });
                        } else {
                            setIsPopupVisible(false);
                            navigation.navigate('NodeDetails', { userId: userId });
                        }
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
                    const userUpdatedData = new FormData();
                    const imagePath = image.uri;
                    const fileName = image.fileName;
                    const fileType = image.type;

                    userUpdatedData.append('image', {
                        uri: imagePath,
                        type: fileType,
                        name: fileName,
                    });
                    const userData = userUpdatedData;
                    const payload = {
                        id: userId,
                        userData
                    };

                    await updateUserProfileImage(payload);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <View className="w-full p-3 bg-white flex-1">
            <View className="w-full bg-[#E9EDF7] flex-1 rounded-[15px] overflow-hidden">
                <View className="w-full h-[38%] relative">
                    <Pressable onPress={openModal}>
                        <Image
                            source={newImagae ? { uri: `${process.env.IMAGE_URL}${newImagae}` } : { uri: `${process.env.IMAGE_URL}${userData.photo}` }}
                            className="w-full h-full object-cover"
                        />

                    </Pressable>
                    <View className="p-4 bg-white absolute bottom-2 rounded-[15px] left-2 shadow-green-700" style={{ elevation: 10 }}>
                        <Text className="tracking-wider font-semibold text-[15px] text-neutral-700">{userData.firstname + ' ' + userData.lastname}</Text>
                    </View>
                    <Pressable onPress={() => setMenuVisible(!menuVisible)} className="px-4 py-1 bg-white absolute top-2 rounded-[15px] right-2 shadow-green-600" style={{ elevation: 7 }}>
                        <AnimatedFontAwesomeIcon
                            name="ellipsis-v"
                            size={27}
                            color="green"
                        />
                    </Pressable>
                    <Pressable onPress={handleAddFamilyDetail} className="p-1 bg-white absolute top-2 rounded-[15px] left-2 shadow-green-600" style={{ elevation: 7 }}>
                        <Text className="tracking-wider font-semibold text-[15px] text-neutral-700">
                            <AnimatedFontAwesomeIcon
                                name="user-plus"
                                size={27}
                                color="green"
                            />
                        </Text>
                    </Pressable>
                    {menuVisible && (
                        <View className="absolute top-2 right-14 bg-white rounded-[15px] shadow-lg px-2 py-1">
                            <View className="flex flex-row items-center gap-2">
                                <Pressable onPress={openUserEditScreen} className="p-1">
                                    <AnimatedFontAwesomeIcon
                                        name="edit"
                                        size={27}
                                        color="blue"
                                    />
                                </Pressable>
                                <Pressable onPress={openDeleteModal} className="p-1">
                                    <AnimatedFontAwesomeIcon
                                        name="trash"
                                        size={27}
                                        color="red"
                                    />
                                </Pressable>
                            </View>
                        </View>
                    )}
                </View>
                <View className="mb-8 p-1 flex-1">
                    <View className="w-full">
                        <Text className="font-extrabold tracking-wider text-xl my-2 ml-2 text-rose-700">Basic Info</Text>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                            {Object.entries(filteredUserData).map(([key, value], index) => (
                                <View key={index + "keyyyss"}>
                                    <View className="w-full p-3 rounded-[15px]">
                                        <View>
                                            <Text className="font-bold tracking-wider text-lg text-neutral-700">{key}</Text>
                                            <Text className="tracking-wider text-[15px] text-neutral-700">{value}</Text>
                                        </View>
                                    </View>
                                    <View className="w-full overflow-hidden">
                                        <View className="h-[1px] bg-[#747272]"></View>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </View>
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slideTop"
                onRequestClose={closeDeleteModal}
            >
                <View className="flex-1 justify-top items-center">
                    {modalVisible && (
                        <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                    )}
                    <View className="w-4/5 bg-white rounded-[15px] p-4 shadow-lg mt-14">
                        <Text className="font-bold text-lg mb-4">Are you sure you want to delete?</Text>
                        <View className="flex-row justify-between items-center">
                            <Pressable onPress={closeDeleteModal} className="px-6 py-2 bg-gray-200 rounded-[15px] mr-2">
                                <Text>Cancel</Text>
                            </Pressable>
                            <Pressable onPress={() => handleDelete(userData._id)} className="px-6 py-2 bg-red-500 rounded-[15px]">
                                <Text className="text-white">Delete</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <ImageViewing
                images={images}
                imageIndex={0}
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
            />
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
        </View>
    );
};

const styles = StyleSheet.create({
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


export default NodeDetails;
