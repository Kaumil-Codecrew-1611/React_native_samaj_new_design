import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CardDetails from '../../../components/CardDetails';
import NoDataFound from '../../../components/NoDataFound/NoDataFound';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';
import i18n from '../../../context/i18n';

const VillageListing = ({ navigation, route }) => {

    const { t } = useTranslation();
    const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);
    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);
    const [listingStyle, setListingStyle] = useState(route.params.listingStyle);
    const [search, setSearch] = useState("");
    const [language, setLanguage] = useState("");
    const { villagesListing, allUserByVillageId, resetData } = useContext(ApiContext);
    const { setSelectedVillage, SelectedVillage, allVillagesListing, setAllVillagesListing } = useContext(GlobalContext);

    useFocusEffect(
        useCallback(() => {
            return () => {
                resetData('allUserByVillage');
            };
        }, [])
    );

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

    useEffect(() => {
        const getSelectedLanguage = async () => {
            try {
                const storedLanguage = await AsyncStorage.getItem('selectedLanguage');
                if (storedLanguage) {
                    i18n.changeLanguage(storedLanguage).catch((error) => {
                        console.error('Error changing language:', error);
                    });
                    console.log(storedLanguage, "storedLanguage")
                    setLanguage(storedLanguage);
                }
            } catch (error) {
                console.error('Error retrieving language:', error);
            }
        };
        getSelectedLanguage();
    }, []);

    const renderItem = ({ item }) => {
        const handleVillageSelect = async (item1) => {
            await setSelectedVillage(item1);
            navigation.navigate('VillageWisePersons', { villageId: item._id });
        };
        const villageImage = process.env.IMAGE_URL + item.image;

        return (
            <View className={`${listingStyle === 'grid' ? 'flex-1 m-2' : 'w-full my-2'} items-center`}>
                <CardDetails
                    size={listingStyle === 'grid' ? 'lg' : 'full'}
                    image={villageImage}
                    content={language == 'en' ? item.villageE : item.villageG}
                    navigation={navigation}
                    villageListing={true}
                    handleSetSelectedVillage={() => handleVillageSelect(item)}
                />
            </View>
        );
    };

    return (
        <View className="flex-1 bg-gray-300">
            <View className="bg-white m-3 h-20 p-2 px-4 rounded-2xl flex items-center">
                <View className="flex flex-row h-full items-center justify-between w-full">
                    <View>
                        <AnimatedFontistoIcon
                            name="holiday-village"
                            size={38}
                            color={"black"}
                        />
                    </View>
                    <View>
                        <Text className="text-3xl text-black font-bold">{t('allvillages')}</Text>
                    </View>
                </View>
            </View>
            <View className="w-full px-4 mb-2">
                <View className="w-full flex flex-row bg-white rounded-xl shadow-2xl items-center" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 }}>
                    <TextInput placeholder={t("searchVillage")} placeholderTextColor="grey" className="basis-[90%] tracking-wider  text-neutral-700  pl-2 " value={search} onChangeText={text => setSearch(text)} />
                    <TouchableOpacity onPress={() => {
                        setSearch("");
                    }}>
                        <View className="">
                            {search !== "" ? (
                                <AnimatedFontistoIcon
                                    name="close"
                                    size={25}
                                    color={"black"}
                                />

                            ) : (
                                <AnimatedFeatherIcon
                                    name="search"
                                    size={25}
                                    color={"black"}
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
                numColumns={listingStyle === 'grid' ? 2 : 1}
                key={listingStyle}
                contentContainerStyle={{
                    display: 'flex',
                    overflow: 'hidden',
                    width: '100%',
                    paddingHorizontal: 2,
                    ...(listingStyle === 'grid' && { gap: 2 }),
                }}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
            {!allVillagesListing.length && <NoDataFound message={"No villages found. Please try again later."} />}
        </View>
    );
};

export default VillageListing;