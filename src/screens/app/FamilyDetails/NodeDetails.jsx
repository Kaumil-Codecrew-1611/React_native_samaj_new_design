import React, { useContext, useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import ApiContext from '../../../context/ApiContext';

const NodeDetails = ({ navigation, route }) => {

    const { userId, node } = route.params;
    const { userDataByParentId } = useContext(ApiContext);
    const [userData, setUserData] = useState([])
    const AnimatedFontAwsomeIcon = Animated.createAnimatedComponent(FontAwsome);

    useEffect(() => {
        (async function () {
            const contentAboutUserData = await userDataByParentId(userId);
            setUserData(contentAboutUserData)
        })();
    }, []);

    const filteredUserData = Object.keys(userData)
        .filter(key => key !== '_id' && key !== 'firstname' && key !== 'lastname' && key !== "__v" && key !== 'created_at' && key !== "deleted_at" && key !== "updated_at" && key !== "device_token" && key !== "payment_id" && key !== "email" && key !== "photo" && key !== "address" && key !== "relationship" && key !== "parent_id")
        .reduce((obj, key) => {
            obj[key] = userData[key];
            return obj;
        }, {});

    const handleAddFamilyDetail = () => {
        navigation.navigate('AddFamilyDetail', { parent_id: userData._id });
    }

    return (
        <View className="w-full p-3 bg-white flex-1">
            <View className="w-full bg-[#E9EDF7] flex-1 rounded-[15px] overflow-hidden">
                <View className=" w-full h-[38%] relative">
                    <Image
                        source={{ uri: 'https://eclatsuperior.com/wp-content/uploads/2021/04/man4.jpg' }}
                        className="w-full h-full object-cover"
                    />
                    <View className="p-4 bg-white  absolute bottom-2 rounded-[15px] left-2  shadow-green-700" style={{
                        elevation: 10,
                    }}>
                        <Text className="tracking-wider font-semibold text-[15px] text-neutral-700">{userData.firstname + ' ' + userData.lastname}</Text>
                    </View >
                    <Pressable onPress={handleAddFamilyDetail} className="p-1 bg-white  absolute top-2 rounded-[15px] right-2  shadow-green-600" style={{ elevation: 7 }}>
                        <Text className="tracking-wider font-semibold text-[15px] text-neutral-700"> <AnimatedFontAwsomeIcon
                            name="user-plus"
                            size={27}
                            color="green"
                        /></Text>
                    </Pressable>
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
                                    <View className=" w-full overflow-hidden">
                                        <View className="h-[1px] bg-[#747272]"></View>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </View>
        </View >
    );
};

export default NodeDetails;

