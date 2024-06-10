import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Fontisto';
import CardDetails from '../../../components/CardDetails';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';

const VillageListing = ({ navigation, route }) => {
    const AnimatedIcon = Animated.createAnimatedComponent(Feather);
    const [listingStyle, setListingStyle] = useState(route.params.listingStyle);
    const [allVillagesListing, setAllVillagesListing] = useState([]);
    const [search, setSearch] = useState("");
    const { villagesListing, allUserByVillageId } = useContext(ApiContext);
    const { setSelectedVillage, SelectedVillage } = useContext(GlobalContext);

    useEffect(() => {
        (async function () {
            const allVillages = await villagesListing();
            setAllVillagesListing(allVillages.village);
        })();
    }, []);

    useFocusEffect(
        useCallback(() => {
            return () => {
                setSearch("");
            };
        }, []))

    useEffect(() => {
        if (SelectedVillage) {
            (async function () {
                await allUserByVillageId(SelectedVillage._id);
            })();
        }
    }, [SelectedVillage]);

    useEffect(() => {
        setTimeout(() => {
            (async function () {
                const allVillages = await villagesListing(search ? search : "");
                setAllVillagesListing(allVillages.village);
            })();
        }, 100)
    }, [search])

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
            <View className="w-full px-4 mb-2">
                <View className="w-full flex flex-row bg-white rounded-xl shadow-2xl items-center" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 }}>
                    <TextInput placeholder={'Search Villages'} placeholderTextColor="grey" className="basis-[90%] tracking-wider  text-neutral-700  pl-2 " value={search} onChangeText={text => setSearch(text)} />
                    <TouchableOpacity onPress={() => {
                        setSearch("");
                    }}>
                        <View className="">
                            {search !== "" ? (
                                <Image
                                    source={{ uri: 'https://e7.pngegg.com/pngimages/211/405/png-clipart-computer-icons-close-button-trademark-logo-thumbnail.png' }}
                                    className="w-7 h-7"
                                />
                            ) : (
                                <Image
                                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvGrZtor2wBaCgpZI0EcGW9--2YrKKIQatZ2Qz4dse-d3nGE3fBKRvp6R_Que1_Ophe4s&usqp=CAU' }}
                                    className="w-6 h-6"
                                />
                            )}
                        </View>
                    </TouchableOpacity>
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