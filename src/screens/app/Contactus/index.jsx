

import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import ContactUsCard from '../../../components/ContactUsCard';


function ContactUs({ navigation }) {

    return (
        <View className=" flex-1 bg-white space-y-5 w-full">

            <View className="mt-4 mb-3 ml-4">
                <View className="flex mb-2 flex-row justify-between w-full items-center">
                    <Text className=" text-4xl tracking-wider text-neutral-700  font-extrabold">Contact Us</Text>
                    <Pressable className=" mr-6" onPress={() => navigation.navigate("Support")}>
                        <View className=" w-[50px] h-[50px] rounded-full bg-[#E9EDF7] flex-row justify-center items-center">
                            <Image className="w-[37px] h-[37px]" source={require('../../../assets/support.png')} />
                        </View>
                    </Pressable>
                </View>
                <Text className="tracking-wider text-neutral-700">If you have any inquries, get in touch with us, we'll be happy to help you</Text>
            </View>

            <ContactUsCard />

        </View>
    )
}

export default ContactUs;
