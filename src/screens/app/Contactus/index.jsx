import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import ContectUsCard from '../../../components/ContectUsCard';


function ContactUs() {

    return (
        <View className=" flex-1 bg-white space-y-5 w-full">

            <View className="mt-4 mb-3 ml-4">
                <View className="flex flex-row justify-between items-center">
                    <Text className="text-4xl tracking-wider text-neutral-700  font-extrabold">Contact Us</Text>
                    <Pressable className="flex-1 bg-white" onPress={() => { }}>
                        <View className="flex-1 bg-white">
                            {/* <Image className="w-full h-96" source={require('../../../assets/images/contactus.jpg')} /> */}
                        </View>
                    </Pressable>
                </View>
                <Text className="tracking-wider text-neutral-700">If you have any inquries, get in touch with us, we'll be happy to help you</Text>
            </View>

            <ContectUsCard />

        </View>
    )
}

export default ContactUs;
