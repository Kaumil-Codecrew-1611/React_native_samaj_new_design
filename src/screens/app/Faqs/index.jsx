import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';

import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import ApiContext from '../../../context/ApiContext';
import { useTranslation } from 'react-i18next';
const { t } = useTranslation();

const Faqs = () => {

    const [search, setSearch] = useState("")
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

                {/* <View className="w-full p-3">

                    <View className="w-full flex flex-row bg-white rounded-xl shadow-2xl items-center" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 }}>
                        <TextInput placeholder={'  Search here...'} placeholderTextColor="#000000" className="basis-[90%] tracking-wider  text-neutral-700  pl-2 " value={search} onChangeText={text => setSearch(text)} />
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
                </View> */}

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


