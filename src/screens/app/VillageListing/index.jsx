import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import CardDetails from '../../../components/CardDetails'
import { FlatList } from 'react-native-gesture-handler';
const VillageListing = ({ navigation }) => {
    const [listingStyle, setListingStyle] = useState('grid')
    const cards = [
        { id: 1, name: "About us" },
        { id: 2, name: "Directory" },
        { id: 3, name: "Villages" },
        { id: 4, name: "Search" },
        { id: 5, name: "News" },
        { id: 6, name: "" },
    ]

    const renderItem = ({ item }) => {

        return (
            <View className="items-center flex-1">
                <CardDetails size={listingStyle == 'grid' ? 'lg' : 'full'} content={item.name} navigation={navigation} />
            </View>
        )
    }
    return (
        <View className="flex-1 bg-gray-300 pb-20">
            <View className="bg-white m-3 h-20 p-2 px-4 rounded-2xl flex items-center">
                <View className="flex flex-row h-full items-center justify-between w-full">
                    <View>
                        <Text className="text-3xl text-black font-bold">Villages</Text>
                    </View>
                    <View className="flex flex-row p-1 rounded-full bg-slate-300 items-center">
                        {/* Icon required for both */}
                        <TouchableOpacity className={`text-center px-3 transition-all ${listingStyle == 'grid' ? 'bg-white rounded-full' : ''}`} onPress={() => setListingStyle('grid')}><Text className={`text-xl font-semibold text-black`}>Grid</Text></TouchableOpacity>

                        <TouchableOpacity className={`text-center px-3 transition-all ${listingStyle == 'view' ? 'bg-white rounded-full' : ''}`} onPress={() => setListingStyle('view')}><Text className={`text-xl font-semibold text-black `}>View</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
            <FlatList
                data={cards}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={(listingStyle == 'grid') ? 2 : 1}
                key={listingStyle}
                contentContainerStyle={{ display: 'flex', overflow: 'hidden', gap: 2, width: '100%', paddingHorizontal: 2 }}
                horizontal={false}
            />
        </View>
    )
}

export default VillageListing;
