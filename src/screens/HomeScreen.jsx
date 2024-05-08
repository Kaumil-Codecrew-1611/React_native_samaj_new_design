import { View, Text, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {
    return (

        <View className="mb-12 flex items-center justify-center">
            <Image source={{ uri: "https://picsum.photos/200/300" }} />
        </View >

    )
}

export default HomeScreen