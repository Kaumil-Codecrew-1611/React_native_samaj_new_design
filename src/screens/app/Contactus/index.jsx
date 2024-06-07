

import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import ContactUsCard from '../../../components/ContactUsCard';
import { ScrollView } from 'native-base';

function ContactUs({ navigation }) {

    return (
        <ScrollView
            className="flex-1 bg-gray-300 space-y-5 w-full"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <View className="bg-white">
                <View className="mx-2 my-2">
                    <View className="flex flex-row justify-between w-full items-center">
                        <Text className="text-4xl tracking-wider text-neutral-700 font-extrabold">Contact Us</Text>
                        <Pressable className="mr-6" onPress={() => navigation.navigate("Support")}>
                            <View className="w-[50px] h-[50px] rounded-full bg-[#E9EDF7] flex-row justify-center items-center">
                                <Image className="w-[37px] h-[37px]" source={require('../../../assets/support.png')} />
                            </View>
                        </Pressable>
                    </View>
                    <Text className="tracking-wider text-neutral-700 mt-2">If you have any inquiries, get in touch with us, we'll be happy to help you</Text>
                </View>
            </View>
            <ContactUsCard />
        </ScrollView>
    )
}

export default ContactUs;
