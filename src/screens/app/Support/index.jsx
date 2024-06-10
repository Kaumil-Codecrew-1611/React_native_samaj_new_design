import React from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
const banner_img = require("../../../assets/support_header_bg.png")

import { useTranslation } from 'react-i18next';

function Support({ navigation }) {
    const { t } = useTranslation();


    const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);

    const redirect = (redirectPath) => {
        if (redirectPath) {
            navigation.navigate(redirectPath)
        } else {
            console.log('path not found')
        }
    }

    return (
        <View className="flex-1 bg-white space-y-5 w-full p-3" edges={['top']}>
            <View className="w-full h-full bg-[#f7f7fa] rounded-[10px] overflow-hidden">
                <View className="w-full h-52 bg-[#E9EDF7] flex flex-row justify-center items-end object-cover">
                    <Image
                        source={banner_img}
                        className="w-[80%] h-[100%]"
                    />
                </View>

                <View className="w-full mt-6 mb-3 flex flex-row justify-center">
                    <View className="w-[90%]">
                        <Text className="font-extrabold tracking-wider mb-3 text-2xl text-rose-700 text-center">{t('tellmehowcan')}</Text>
                        <Text className="tracking-wider text-lg text-neutral-700 text-center">{t('ourcrewofexpertsareon')}</Text>
                    </View>
                </View>

                <View className="w-full p-3">
                    <TouchableOpacity activeOpacity={0.95} onPress={() => redirect('EmailSupport')}>
                        <View className="w-full bg-white h-24 rounded-[15px] mb-3 flex flex-row shadow-2xl" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 }}>
                            <View className="basis-[25%] p-3">
                                <View className="w-full bg-[#F8F8FA] h-full lex flex-row justify-center items-center rounded-[25px] ">
                                    <View className="w-[40px] h-[40px] overflow-hidden">
                                        <Image
                                            source={require("../../../assets/send_email.png")}
                                            className="w-full h-full object-cover"
                                        />
                                    </View>
                                </View>
                            </View>
                            <View className="basis-[55%] p-3">
                                <Text className="tracking-wider font-extrabold text-xl text-neutral-700 mb-2">{t('email')}</Text>
                                <Text className="tracking-wider text-sm text-neutral-700">{t('getthesolutionsend')}</Text>
                            </View>
                            <View className="flex flex-row justify-center basis-[20%] h-full items-center">
                                <AnimatedFeatherIcon
                                    name="arrow-right"
                                    size={30}
                                    color="#40A5E5"
                                    className="m-2"
                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.95} onPress={() => redirect('Faqs')}>
                        <View className="w-full bg-white h-24 rounded-[15px] mb-3 flex flex-row shadow-2xl" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 }}>
                            <View className="basis-[25%] p-3">
                                <View className="w-full bg-[#F8F8FA] h-full lex flex-row justify-center items-center rounded-[25px] ">
                                    <View className="w-[50px] h-[50px] overflow-hidden">
                                        <Image
                                            source={require("../../../assets/faqs_icon.png")}
                                            className="w-full h-full object-cover"
                                        />
                                    </View>
                                </View>
                            </View>
                            <View className="basis-[55%] p-3">
                                <Text className="tracking-wider font-extrabold text-xl text-neutral-700 mb-2">FAQs</Text>
                                <Text className="tracking-wider text-sm text-neutral-700">{t('findintelligentanswersInstantly')}</Text>
                            </View>
                            <View className="flex flex-row justify-center basis-[20%] h-full items-center">
                                <AnimatedFeatherIcon
                                    name="arrow-right"
                                    size={30}
                                    color="#40A5E5"
                                    className="m-2"
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Support
