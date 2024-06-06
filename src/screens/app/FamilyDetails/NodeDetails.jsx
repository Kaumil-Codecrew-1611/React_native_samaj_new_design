import React, { useContext, useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View, Modal } from 'react-native';
import Animated from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';

const NodeDetails = ({ navigation, route }) => {
    const { userId } = route.params;
    const paramsData = route.params;
    const { userDataByParentId, handleDeleteProfileUser, state } = useContext(ApiContext);
    const { allUserInfo } = useContext(GlobalContext);
    const [userData, setUserData] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const AnimatedFontAwesomeIcon = Animated.createAnimatedComponent(FontAwesome);

    useEffect(() => {
        (async function () {
            const contentAboutUserData = await userDataByParentId(userId);
            setUserData(contentAboutUserData);
        })();
    }, []);

    const filteredUserData = Object.keys(userData)
        .filter(key => key !== '_id' && key !== 'firstname' && key !== 'lastname' && key !== '__v' && key !== 'created_at' && key !== 'deleted_at' && key !== 'updated_at' && key !== 'device_token' && key !== 'payment_id' && key !== 'email' && key !== 'photo' && key !== 'address' && key !== 'relationship' && key !== 'parent_id')
        .reduce((obj, key) => {
            obj[key] = userData[key];
            return obj;
        }, {});

    const handleAddFamilyDetail = () => {
        navigation.navigate('AddFamilyDetail', { parent_id: userData._id });
    };

    const handleEdit = () => {
        console.log('Edit clicked');
    };

    const handleDelete = async (user_Id) => {
        await handleDeleteProfileUser(user_Id)
        navigation.navigate('ViewFamilyDetails');
    };

    const openDeleteModal = () => {
        setModalVisible(true);
    };

    const closeDeleteModal = () => {
        setModalVisible(false);
    };
    console.log(allUserInfo._id, paramsData.paramsId, "userData?._id")
    function visibleEditDetail() {
        console.log("called");
        const id = paramsData?.paramsId;
        const userId = allUserInfo?._id;
        console.log(userId, ":::::userId::::::", id, ":::::id:::::");

        function renderPressable() {
            return (
                <>
                    <Pressable onPress={handleAddFamilyDetail} className="p-1 bg-white absolute top-2 rounded-[15px] left-2 shadow-green-600" style={{ elevation: 7 }}>
                        <Text className="tracking-wider font-semibold text-[15px] text-neutral-700">
                            <AnimatedFontAwesomeIcon
                                name="user-plus"
                                size={27}
                                color="green"
                            />
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => setMenuVisible(!menuVisible)} className="px-4 py-1 bg-white absolute top-2 rounded-[15px] right-2 shadow-green-600" style={{ elevation: 7 }}>
                        <AnimatedFontAwesomeIcon
                            name="ellipsis-v"
                            size={27}
                            color="green"
                        />
                    </Pressable>
                </>
            )
        };

        if (id === undefined || id === null) {
            // When id is not available but userId is
            if (userId) {
                console.log(" 111111")
                return renderPressable();
            }
        } else if (id === userId) {
            console.log(" 222222 ")
            return renderPressable();
        }
        else if (!id || typeof id === undefined && userId) {
            console.log(" 3333333 ")
            return renderPressable();
        }
        console.log(" 4444444 ")
        return <></>;
    }



    return (
        <View className="w-full p-3 bg-white flex-1">
            <View className="w-full bg-[#E9EDF7] flex-1 rounded-[15px] overflow-hidden">
                <View className="w-full h-[38%] relative">
                    <Image
                        source={{ uri: 'https://eclatsuperior.com/wp-content/uploads/2021/04/man4.jpg' }}
                        className="w-full h-full object-cover"
                    />
                    <View className="p-4 bg-white absolute bottom-2 rounded-[15px] left-2 shadow-green-700" style={{ elevation: 10 }}>
                        <Text className="tracking-wider font-semibold text-[15px] text-neutral-700">{userData.firstname + ' ' + userData.lastname}</Text>
                    </View>
                    {visibleEditDetail()}

                    {/* <Pressable onPress={handleAddFamilyDetail} className="p-1 bg-white absolute top-2 rounded-[15px] left-2 shadow-green-600" style={{ elevation: 7 }}>
                        <Text className="tracking-wider font-semibold text-[15px] text-neutral-700">
                            <AnimatedFontAwesomeIcon
                                name="user-plus"
                                size={27}
                                color="green"
                            />
                        </Text>
                    </Pressable> */}
                    {menuVisible && (
                        <View className="absolute top-2 right-14 bg-white rounded-[15px] shadow-lg px-2 py-1">
                            <View className="flex flex-row items-center gap-2">
                                <Pressable onPress={handleEdit} className="p-1">
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
        </View>
    );
};

export default NodeDetails;
