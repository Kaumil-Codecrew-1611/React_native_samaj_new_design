import React from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import Animated from 'react-native-reanimated';
// AddFamilyDetail
const NodeDetails = ({ navigation, route }) => {
    const { node } = route.params;

    const userData = {
        firstName: 'Sandip',
        lastName: "Ganava",
        ...(node.spouse && { wife: node.spouse.name }),
        ...(node.children && { children: node.children.map(child => child.name).join(', ') }),
        number: 132346789,
        dob: '14/05/03',
    };
    const filteredUserData = Object.keys(userData)
        .filter(key => key !== 'firstName' && key !== 'lastName')
        .reduce((obj, key) => {
            obj[key] = userData[key];
            return obj;
        }, {});

    const AnimatedFontAwsomeIcon = Animated.createAnimatedComponent(FontAwsome);

    const icon = {
        wife: "female",
        children: "child",
        dob: "calendar",
        number: "mobile-phone"
    };
    const handleAddFamilyDetail = () => {
        navigation.navigate('AddFamilyDetail', { id: node.id });
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
                        <Text className="tracking-wider font-semibold text-[15px] text-neutral-700">{userData.firstName + ' ' + userData.lastName}</Text>
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
                                <View key={index}>
                                    <View key={index} className="w-full flex-row p-3 rounded-[15px]">
                                        <View className="basis-[20%] mr-4">
                                            <View className="w-[50px] h-[50px] flex-row justify-center bg-green-50 p-2 rounded-[60px] items-center">
                                                <AnimatedFontAwsomeIcon
                                                    name={icon[key] || "info"}
                                                    size={27}
                                                    color="green"
                                                />
                                            </View>
                                        </View>
                                        <View>
                                            <Text className="font-bold tracking-wider text-lg text-neutral-700">{value}</Text>
                                            <Text className="tracking-wider text-[15px] text-neutral-700">{key}</Text>
                                        </View>
                                    </View>
                                    <View className=" w-full pl-24 pr-8 overflow-hidden">
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

