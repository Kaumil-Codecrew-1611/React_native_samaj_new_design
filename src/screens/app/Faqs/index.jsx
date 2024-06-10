import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';

import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import ApiContext from '../../../context/ApiContext';
import { useTranslation } from 'react-i18next';


const Faqs = () => {
    const { t } = useTranslation();
    const [visibleAnswers, setVisibleAnswers] = useState({});
    const { allfaqListing } = useContext(ApiContext);
    const [faqs, setFaq] = useState([]);

    useEffect(() => {
        const fetchCommitteeMembers = async () => {
            try {
                const faqDetails = await allfaqListing();
                setFaq(faqDetails);
            } catch (error) {
                console.error("Failed to fetch committee members", error);
            }
        };
        fetchCommitteeMembers();
    }, []);

    const toggleAnswerVisibility = (id) => {
        setVisibleAnswers((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);

    const renderItems = ({ item }) => {
        const isAnswerVisible = visibleAnswers[item._id];

        return (
            <View className="w-full p-[10px]">
                <TouchableOpacity activeOpacity={0.95} onPress={() => toggleAnswerVisibility(item._id)}>
                    <View className="flex flex-row justify-between items-center bg-white shadow-2xl shadow-black  rounded-[15px] p-[15px]" style={{ shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 2, elevation: 5 }}>
                        <Text className="font-extrabold tracking-wider text-lg text-neutral-700 basis-[91%]">
                            {item.question}
                        </Text>
                        <AnimatedFeatherIcon
                            name={isAnswerVisible ? 'chevron-up' : 'chevron-down'}
                            size={30}
                            color="#666"
                        />
                    </View>
                </TouchableOpacity>
                {isAnswerVisible && (
                    <View className="bg-white rounded-[15px] p-[15px] mt-[10px]" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 }}>
                        <Text style={{ color: '#333' }}>
                            {item.answer}
                        </Text>
                    </View>
                )}
            </View>
        );
    };

    return (
        <View className="flex-1 bg-white space-y-5 w-full p-3" edges={['top']}>
            <View className="w-full h-full bg-[#F7F7FA] rounded-[10px] overflow-hidden">
                <View className="w-full h-40 bg-[#E9EDF7] flex flex-row ">
                    <View className="basis-[35%] flex flex-row justify-center items-center">
                        <Image
                            source={require("../../../assets/faqs_header_bg.png")}
                            className="w-[60px] h-[100px] object-cover"
                        />
                    </View>
                    <View className="basis-[65%] flex flex-row justify-center items-center">
                        <Text className="font-extrabold tracking-wider text-2xl text-rose-700">
                            {t('Quickhelpforcommonissues')}
                        </Text>
                    </View>
                </View>
                <SafeAreaView style={{ flex: 1 }}>
                    <FlatList
                        data={faqs}
                        renderItem={renderItems}
                        keyExtractor={item => item._id.toString()}
                    />
                </SafeAreaView>
            </View>
        </View>
    )
}

export default Faqs


