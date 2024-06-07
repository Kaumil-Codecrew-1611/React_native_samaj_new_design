

import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import ContactUsCard from '../../../components/ContactUsCard';
import { useTranslation } from 'react-i18next';


function ContactUs({ navigation }) {
    const { t } = useTranslation();

    return (
        <View className=" flex-1 bg-white space-y-5 w-full">

            <View className="mt-4 mb-3 ml-4">
                <View className="flex mb-2 flex-row justify-between w-full items-center">
                    <Text className=" text-4xl tracking-wider text-neutral-700  font-extrabold">{t('contactUs')}</Text>
                    <Pressable className=" mr-6" onPress={() => navigation.navigate("Support")}>
                        <View className=" w-[50px] h-[50px] rounded-full bg-[#E9EDF7] flex-row justify-center items-center">
                            <Image className="w-[37px] h-[37px]" source={require('../../../assets/support.png')} />
                        </View>
                    </Pressable>
                </View>
                <Text className="tracking-wider text-neutral-700">{t('contactusheading')}</Text>
            </View>

            <ContactUsCard />

        </View>
    )
}

export default ContactUs;
