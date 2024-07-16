import { View, Text } from 'react-native'
import React from 'react'

const Card2 = () => {
    return (
        <>
            <View className="bg-white h-full rounded-2xl p-5 w-full max-w-md shadow-lg relative overflow-hidden">
                <View className="flex flex-row items-center flex-wrap mb-2">
                    <Text className="text-black text-base font-bold tracking-wide">Short Description :- </Text>
                    <Text className="text-black text-sm text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                    </Text>
                </View>
                <View className="flex flex-row items-center flex-wrap mb-2">
                    <Text className="text-black text-base font-bold tracking-wide">Long description :- </Text>
                    <Text className="text-black text-sm text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Morbi ut ultrices felis. Curabitur ultricies, nisi nec interdum facilisis, nulla dolor.

                    </Text>
                </View>
            </View>

        </>

    )
}

export default Card2