import React, { useContext } from 'react';
import { Text, View, Image, Pressable } from 'native-base';
import { Animated, Linking } from 'react-native';
import { GlobalContext } from '../../../context/globalState';
import TwitterIcon from '../../../assets/twitter.svg';
import Fontisto from 'react-native-vector-icons/Fontisto';

const BusinessCardScreen = () => {
    const { allUserInfo } = useContext(GlobalContext);
    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);
    return (
        <View className="p-5 h-full bg-blue-100">
            <View className="bg-white rounded-2xl p-5 w-full max-w-md shadow-lg">
                <View className="items-center">
                    <Image className="inline-block h-36 w-36 rounded-full ring-2 ring-white"
                        source={{ uri: process.env.IMAGE_URL + allUserInfo?.photo ? process.env.IMAGE_URL + allUserInfo?.photo : 'https://eclatsuperior.com/wp-content/uploads/2021/04/man4.jpg' }}
                        alt='profile-img'
                    />
                    <Text className="text-2xl text-black font-bold mt-4">
                        Sophie Mitchell
                    </Text>
                    <Text className="text-sm text-gray-500 mb-2">
                        Chief Marketing Officer
                    </Text>
                </View>
                <View className="border-b-2 border-black"></View>
                <Text className="text-center text-gray-600 my-4">
                    I oversee the planning, development, and execution of the company's marketing and advertising initiatives.
                </Text>
                <View className="space-y-2">
                    <View className="flex-row items-center">
                        <Text className="text-lg text-gray-800">📞</Text>
                        <Text className="ml-2 text-gray-800">+1543216789</Text>
                    </View>
                    <View className="flex-row items-center">
                        <Text className="text-lg text-gray-800">📧</Text>
                        <Text className="ml-2 text-gray-800">sophie.m@cloudtech.com</Text>
                    </View>
                    <View className="flex-row items-center">
                        <Text className="text-lg text-gray-800">🌐</Text>
                        <Text className="ml-2 text-gray-800">www.cloudtech.com</Text>
                    </View>
                </View>
                <Text className="text-center text-gray-500 my-4">Connect with me on</Text>
                <View className="flex-row justify-center space-x-4">
                    <Pressable onPress={() => Linking.openURL('https://facebook.com')}>
                        <Image
                            source={{ uri: 'https://example.com/facebook-icon.png' }}
                            alt="Facebook"
                            className="h-10 w-10"
                        />
                    </Pressable>
                    <Pressable onPress={() => Linking.openURL('https://linkedin.com')}>
                        <AnimatedFontistoIcon
                            name="instagram"
                            size={40}
                            color="#f700b2"
                        />
                    </Pressable>
                    <Pressable onPress={() => Linking.openURL('https://twitter.com')}>
                        <TwitterIcon width={40} height={40} color='red' />
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default BusinessCardScreen;
