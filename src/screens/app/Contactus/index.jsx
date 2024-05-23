import React from 'react'
import { View, Text } from 'react-native'
import ContectUsCard from '../../../components/ContectUsCard';

function ContectUs() {
    return (
        <View className="flex-1 bg-white space-y-5 w-full">
            <View className="mt-4 mb-3 ml-4">
                <Text className=" text-4xl tracking-wider text-neutral-700  font-extrabold">Contect Us</Text>
                <Text className="tracking-wider text-neutral-700">If you have any inquries, get in touch with us, we'll be happy to help you</Text>
            </View>

            <ContectUsCard />
        </View>
    )
}

export default ContectUs;
