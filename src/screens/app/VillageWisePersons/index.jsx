import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import VillageByName from "../../../components/VillageByName";
import ApiContext from "../../../context/ApiContext";
import { GlobalContext } from "../../../context/globalState";
import i18n from '../../../context/i18n';


const VillageWisePersons = ({ navigation, route }) => {
    const villageId = route.params?.villageId;
    const { t } = useTranslation();
    const [search, setSearch] = useState("");
    const [language, setLanguage] = useState("");
    const { resetData, allUserByVillageId } = useContext(ApiContext);
    const { SelectedVillage } = useContext(GlobalContext);
    const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);
    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);

    useEffect(() => {
        if (SelectedVillage || villageId) {
            (async function () {
                await allUserByVillageId(villageId || SelectedVillage._id);
            })();
        }
    }, [SelectedVillage, villageId]);
    useFocusEffect(
        useCallback(() => {
            return () => {
                resetData('allUserByVillage');
            };
        }, [])
    );

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

    return (

        <View className="flex-1 bg-gray-300 space-y-5 w-full" edges={['top']}>
            <View>
                <Text className="font-bold text-3xl tracking-wider text-neutral-700 mt-4 ml-6">{language == 'gu' ? SelectedVillage.villageG : SelectedVillage.villageE} {t('VillagePeople')}</Text>
            </View>
            <View className="relative bg-white m-3 px-3 h-14 rounded-2xl">
                <View className='flex-1 justify-center items-center'>
                    <TouchableOpacity onPress={() => {
                        setSearch("");
                    }}>
                        <View className="flex flex-row items-center relative overflow-hidden" >
                            <TextInput placeholder={t("searchPersonVillage")} className="w-full text-black" placeholderTextColor="grey" value={search} onChangeText={text => setSearch(text)} />
                            <View className="h-full flex justify-center absolute right-[6px]">
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
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <VillageByName searchValue={search} navigation={navigation} />
        </View >
    );
};

export default VillageWisePersons;