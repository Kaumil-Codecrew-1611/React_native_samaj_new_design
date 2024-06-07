import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Fontisto';
import CardDetails from '../../../components/CardDetails';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';

const VillageListing = ({ navigation, route }) => {
    const AnimatedIcon = Animated.createAnimatedComponent(Feather);
    const [listingStyle, setListingStyle] = useState(route.params.listingStyle);
    const [allVillagesListing, setAllVillagesListing] = useState([]);
    const { villagesListing, allUserByVillageId } = useContext(ApiContext);
    const { setSelectedVillage, SelectedVillage } = useContext(GlobalContext);

    useEffect(() => {
        (async function () {
            const allVillages = await villagesListing();
            setAllVillagesListing(allVillages.village);
        })();
    }, []);

    useEffect(() => {
        if (SelectedVillage) {
            (async function () {
                await allUserByVillageId(SelectedVillage._id);
            })();
        }
    }, [SelectedVillage]);

    useEffect(() => {
        const params = route.params;
        if (route.params.listingStyle !== listingStyle) {
            setListingStyle(params.listingStyle);
        }
    }, [route.params.listingStyle]);

    const handleVillageSelect = (item) => {
        setSelectedVillage(item);
        navigation.navigate('VillageWisePersons', { villageId: item._id });
    };

    const renderItem = ({ item }) => {
        return (
            <View className="items-center flex-1">
                <CardDetails
                    size={listingStyle === 'grid' ? 'lg' : 'full'}
                    image="https://img.freepik.com/free-photo/eiffel-tower-paris-with-gorgeous-colors-autumn_268835-828.jpg"
                    content={item.villageE}
                    navigation={navigation}
                    setSelectedVillage={() => handleVillageSelect(item)}
                    redirectTo="VillageWisePersons"
                />
            </View>
        );
    };

    return (
        <View className="flex-1 bg-gray-300">
            <View className="bg-white m-3 h-20 p-2 px-4 rounded-2xl flex items-center">
                <View className="flex flex-row h-full items-center justify-between w-full">
                    <View>
                        <AnimatedIcon
                            name="holiday-village"
                            size={38}
                        />
                    </View>
                    <View>
                        <Text className="text-3xl text-black font-bold">Villages</Text>
                    </View>
                </View>
            </View>
            <FlatList
                data={allVillagesListing}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                numColumns={(listingStyle === 'grid') ? 2 : 1}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                key={listingStyle}
                contentContainerStyle={{ display: 'flex', overflow: 'hidden', gap: 2, width: '100%', paddingHorizontal: 2 }}
                horizontal={false}
            />
        </View>
    );
};

export default VillageListing;