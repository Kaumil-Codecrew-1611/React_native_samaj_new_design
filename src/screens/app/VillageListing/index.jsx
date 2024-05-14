import React from 'react'
import { View, Text } from 'react-native'
import CardDetails from '../../../components/CardDetails'
import { FlatList } from 'react-native-gesture-handler';
const VillageListing = ({ navigation }) => {
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
            <View className="flex-1">
                <CardDetails content={item.name} navigation={navigation} />
            </View>
        )
    }
    return (
        <View className="flex-1 bg-gray-300 pb-20">
            <FlatList
                data={cards}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={3}
                contentContainerStyle={{ display: 'flex', overflow: 'hidden', gap: 2, width: '100%', alignSelf: "stretch", paddingHorizontal: 2 }}
                horizontal={false}
            />
        </View>
    )
}

export default VillageListing;
