import React from 'react';
import { Image, Text, View } from 'react-native';

const NoDataFound = ({ message }) => {
    return (
        <View className="w-screen h-full flex items-center">
            <View className="w-full h-[300px] flex items-center px-10 py-7">
                <Image className="w-full h-full object-cover rounded-lg" source={require('../../assets/nodatafound.jpg')} />
            </View>
            <View className="px-10">
                <Text className="text-black text-2xl dark:text-white font-semibold">
                    {message}
                </Text>
            </View>
        </View>
    )
}

export default NoDataFound