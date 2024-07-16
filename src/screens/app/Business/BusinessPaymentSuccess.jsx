import React from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import Button from '../../../components/Button';

function BusinessPaymentSuccess({ navigation, route }) {

    const windowHeight = Dimensions.get('window').height;
    const userName = route.params.name
    const businessName = route.params.businessName
    const businessNameEmail = route.params.businessEmail

    const handleredirect = () => {
        navigation.navigate("MyBusinessCardScreen");
    }

    return (
        <View className="flex-1 bg-green-200 relative">
            <View className={`w-full absolute  ${windowHeight < 670 ? "top-[90px]" : "top-[160px]"} z-10 h-16 flex-row justify-center`}>
                <View className=" w-72 rounded-xl bg-green-600 h-full flex-row justify-center items-center">
                    <Text className="text-white text-xl font-extrabold">Business Payment Success</Text>
                </View>
            </View>
            <View className="w-full bg-white h-[75%] pt-24 px-8 rounded-t-[45px] overflow-hidden absolute bottom-0">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View className="flex-1 ">
                        <View className="w-full mb-3 bg-[#E9EDF7] flex-row items-center p-4 rounded-[10px]">
                            <View className="h-full basis-[37%]">
                                <Text className="text-lg text-[#4e63ac]  font-extrabold">Name :</Text>
                            </View>
                            <View className="basis-[63%]">
                                <Text className="text-base text-neutral-700  font-bold">{userName}</Text>
                            </View>
                        </View>
                        <View className="w-full mb-3 bg-[#E9EDF7] flex-row items-center p-4 rounded-[10px]">
                            <View className="h-full basis-[37%]">
                                <Text className="text-lg  text-[#4e63ac] font-extrabold">Business Name :</Text>
                            </View>
                            <View className="basis-[63%]">
                                <Text className="text-base text-neutral-700  font-bold">{businessName}</Text>
                            </View>
                        </View>
                        <View className="w-full mb-3 bg-[#E9EDF7] flex-row items-center p-4 rounded-[10px]">
                            <View className="h-full basis-[37%]">
                                <Text className="text-base text-[#4e63ac]  font-extrabold">Business Email :</Text>
                            </View>
                            <View className="basis-[63%]">
                                <Text className="text-base text-neutral-700  font-bold">{businessNameEmail}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View className="mb-12">
                    <Button className="bg-green-600 py-3 rounded-lg" title="Go to Business Page" onPress={handleredirect} />
                </View>
            </View>
        </View>
    );
}

export default BusinessPaymentSuccess;