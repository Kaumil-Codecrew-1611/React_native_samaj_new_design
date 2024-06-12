

import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import ContactUsCard from '../../../components/ContactUsCard';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'native-base';

function ContactUs({ navigation }) {
    const { t } = useTranslation();

    return (
        <View className=" flex-1 bg-[#E9EDF7] space-y-5 w-full">
            <View className="bg-white p-3">
                <View className="flex flex-row justify-between items-center">
                    <Text className=" text-2xl tracking-wider text-neutral-700  font-extrabold">{t('contactUs')}</Text>
                    <Pressable className=" mr-6" onPress={() => navigation.navigate("Support")}>
                        <View className=" w-[50px] h-[50px] rounded-full bg-[#E9EDF7] flex-row justify-center items-center">
                            <Image className="w-[37px] h-[37px]" source={require('../../../assets/support.png')} />
                        </View>
                    </Pressable>
                </View>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }} showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false} >
                <View className="bg-white p-2 mr-2 rounded-lg mx-4">
                    <Text className="tracking-wider text-neutral-700 px-3 text-justify">{t('contactusheading')}</Text>
                </View>
                <ContactUsCard />
            </ScrollView>
        </View>

    )
}

export default ContactUs;
