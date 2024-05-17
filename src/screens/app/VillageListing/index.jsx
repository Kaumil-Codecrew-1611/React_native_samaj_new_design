import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import CardDetails from '../../../components/CardDetails'
import { FlatList } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Fontisto';
import Animated from 'react-native-reanimated';
import { GlobalContext } from '../../../context/globalState';

const VillageListing = ({ navigation, route }) => {
    const AnimatedIcon = Animated.createAnimatedComponent(Feather);
    const [listingStyle, setListingStyle] = useState(route.params.listingStyle)
    useEffect(() => {
        const params = route.params
        if (route.params.listingStyle !== listingStyle) {
            setListingStyle(params.listingStyle)
        }
    }, [route.params.listingStyle])

    const cards = [
        { id: 1, name: "About us", redirectTo: "VillageWisePersons" },
        { id: 2, name: "Directory", redirectTo: "VillageWisePersons" },
        { id: 3, name: "Villages", redirectTo: "VillageWisePersons" },
        { id: 4, name: "Search", redirectTo: "VillageWisePersons" },
        { id: 5, name: "News", redirectTo: "VillageWisePersons" },
        { id: 6, name: "" },
    ]
    const { setSelectedVillage } = useContext(GlobalContext)
    const renderItem = ({ item }) => {

        return (
            <View className="items-center flex-1">
                <CardDetails size={listingStyle == 'grid' ? 'lg' : 'full'} content={item.name} navigation={navigation} setSelectedVillage={setSelectedVillage} redirectTo={item.redirectTo} />
            </View>
        )
    }
    return (
        <View className="flex-1 bg-gray-300">
            {/* Add pb-20 if using this in bottom navigator */}
            <View className="bg-white m-3 h-20 p-2 px-4 rounded-2xl flex items-center">
                <View className="flex flex-row h-full items-center justify-between w-full">
                    <View>
                        <AnimatedIcon
                            name="holiday-village"
                            size={38}

                        />
                    </View><View>
                        <Text className="text-3xl text-black font-bold">Villages</Text>
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
