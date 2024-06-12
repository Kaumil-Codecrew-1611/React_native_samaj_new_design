import React from 'react'
import { Image, Text, View, TouchableOpacity, ScrollView } from 'react-native'
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

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <View className="w-full p-3">
                        <TouchableOpacity activeOpacity={0.95} onPress={() => redirect('EmailSupport')}>
                            <View className="bg-white p-3 mb-2 ">
                                <View className="flex flex-row justify-between items-center">
                                    <View className="w-[40px] h-[40px] overflow-hidden">
                                        <Image
                                            source={require("../../../assets/send_email.png")}
                                            className="w-full h-full object-cover"
                                        />
                                    </View>
                                    <View className="w-[160px]">
                                        <View>
                                            <Text className="tracking-wider font-extrabold text-xl text-neutral-700 mb-2">{t('email')}</Text>
                                            <Text className="tracking-wider text-sm text-neutral-700">{t('getthesolutionsend')}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <AnimatedFeatherIcon
                                            name="arrow-right"
                                            size={30}
                                            color="#40A5E5"
                                            className="m-2"
                                        />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.95} onPress={() => redirect('Faqs')}>
                            <View className="bg-white p-3 mb-2 rounded-[20px] shadow-2xl">
                                <View className="flex flex-row justify-between items-center">
                                    <View className="w-[40px] h-[40px] overflow-hidden">
                                        <Image
                                            source={require("../../../assets/faqs_icon.png")}
                                            className="w-full h-full object-cover"
                                        />
                                    </View>
                                    <View className="w-[160px]">
                                        <View>
                                            <Text className="tracking-wider font-extrabold text-xl text-neutral-700 mb-2">FAQs</Text>
                                            <Text className="tracking-wider text-sm text-neutral-700">{t('findintelligentanswersInstantly')}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <AnimatedFeatherIcon
                                            name="arrow-right"
                                            size={30}
                                            color="#40A5E5"
                                            className="m-2"
                                        />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Support
