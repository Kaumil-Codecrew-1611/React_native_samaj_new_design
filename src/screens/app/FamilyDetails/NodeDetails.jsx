import React, { useContext, useEffect, useState } from 'react';
import { Image, Modal, PermissionsAndroid, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import Animated from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';
import ImagePicker from 'react-native-image-crop-picker';

const NodeDetails = ({ navigation, route }) => {
    var { userId } = route.params;
    const paramsData = route.params;
    const { userDataByParentId, handleDeleteProfileUser, updateUserProfileImage } = useContext(ApiContext);
    const { allUserInfo } = useContext(GlobalContext);
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
        .filter(key => key !== '_id' && key !== 'firstname' && key !== 'lastname' && key !== '__v' && key !== 'created_at' && key !== 'deleted_at' && key !== 'updated_at' && key !== 'device_token' && key !== 'payment_id' && key !== 'email' && key !== 'photo' && key !== 'address' && key !== 'relationship' && key !== 'parent_id' && key !== "password" && key !== "locations_id" && key !== "personal_id" && key !== "" && key !== "profile_banner")
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
        const id = paramsData?.paramsId;
        const userId = allUserInfo?._id;
        if (id === undefined || id === null) {
            if (userId) {
                setIsPopupVisible(true);
            }
        } else if (id === userId) {
            setIsPopupVisible(true);
        }
        else if (!id || typeof id === undefined && userId) {
            setIsPopupVisible(true);
        }
        else {
            setIsPopupVisible(false);;
        }
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    const viewProfileImage = () => {
        closePopup();
        setIsVisible(true);
    };

    const selectImage = async () => {
        ImagePicker.openPicker({
            width: 400,
            height: 300,
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
                id: userId,
                userData
            };
            const response = await updateUserProfileImage(payload);
            if (response) {
                setImage(response.userData.photo)
                setIsPopupVisible(false);
                navigation.navigate('NodeDetails', { userId: userId });
            } else {
                setIsPopupVisible(false);
                navigation.navigate('NodeDetails', { userId: userId });
            }
        }).catch((error) => {
            console.log(error, "errorChangingImage")
        });
    };

    function visibleEditDetail() {

        const id = paramsData?.paramsId;
        const userId = allUserInfo?._id;

        function renderPressable() {
            return (
                <>
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
                </>
            )
        };

        if (id === undefined || id === null) {
            if (userId) {
                return renderPressable();
            }
        } else if (id === userId) {
            return renderPressable();
        }
        else if (!id || typeof id === undefined && userId) {
            return renderPressable();
        }
        return <></>;
    }

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
                    {visibleEditDetail()}
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
                                            <Text className="font-bold tracking-wider text-lg text-neutral-700 capitalize">{key.replace(/_/g, " ")}</Text>
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