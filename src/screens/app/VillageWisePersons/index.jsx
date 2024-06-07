import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useContext, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import VillageByName from "../../../components/VillageByName";
import ApiContext from "../../../context/ApiContext";
import { useTranslation } from 'react-i18next';
const { t } = useTranslation();

const VillageWisePersons = ({ navigation }) => {

    const [search, setSearch] = useState("");
    const { resetData } = useContext(ApiContext);
    useFocusEffect(
        useCallback(() => {
            return () => {
                resetData('allUserByVillage');
            };
        }, [])
    );
    return (

        <View className="flex-1 bg-gray-300 space-y-5 w-full" edges={['top']}>
            <View>
                <Text className="font-bold text-3xl tracking-wider text-neutral-700 mt-4 ml-6">{t('VillagePeople')}</Text>
            </View>
            <View className="relative bg-white m-3 px-3 h-14 rounded-2xl">
                <View className='flex-1 justify-center items-center'>
                    <TouchableOpacity onPress={() => {
                        setSearch("");
                    }}>
                        <View className="flex flex-row items-center relative overflow-hidden" >
                            <TextInput placeholder={'  Search here...'} className="w-full" value={search} onChangeText={text => setSearch(text)} />
                            <View className="h-full flex justify-center absolute right-[6px]">
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
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <VillageByName searchValue={search} navigation={navigation} />
        </View >
    );
};

export default VillageWisePersons;