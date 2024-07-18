import { Image } from 'native-base';
import React, { useContext, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import { GlobalContext } from '../../../../context/globalState';

const BusinessCardScreen2 = () => {

    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const profileAnimation = new Animated.Value(0);
    const profileBusinessScale = profileAnimation.interpolate({ inputRange, outputRange });
    const { allUserInfo } = useContext(GlobalContext);
    const [isVisible, setIsVisible] = useState(false);
    const images = [(allUserInfo && allUserInfo.photo) ? { uri: `${process.env.IMAGE_URL}${allUserInfo.photo}` } : require("../../../../assets/profile_img.png")];


    const onPressInBusinessProfile = () => {
        Animated.spring(profileAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressOutBusinessProfile = () => {
        Animated.spring(profileAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                <View className="m-2">
                    <View className="bg-white rounded-md h-full shadow-2xl shadow-black p-3">
                        <View className="items-center mb-4">
                            <View className="border-2 rounded-full border-red-800 p-2">
                                <Animated.View style={[{ transform: [{ scale: profileBusinessScale }] }]}>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPressIn={onPressInBusinessProfile}
                                        onPressOut={onPressOutBusinessProfile}
                                        onPress={() => setIsVisible(true)}
                                    >
                                        <Image
                                            className="inline-block h-36 w-36 rounded-full ring-2 ring-white"
                                            source={{ uri: process.env.IMAGE_URL + allUserInfo?.photo ? process.env.IMAGE_URL + allUserInfo?.photo : 'https://eclatsuperior.com/wp-content/uploads/2021/04/man4.jpg' }}
                                            alt='profile-img'
                                        />
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>
                            <Text className="text-2xl text-black font-bold mt-4">
                                Vishw Prajapati
                            </Text>

                            <Text className="text-lg text-gray-800 font-semibold mt-2">
                                Owner of Asgard Tours and Travels
                            </Text>

                            <Text className="text-lg text-gray-800 font-semibold mt-2">
                                Travel Company - Since 2002
                            </Text>

                        </View>
                    </View>
                </View>
                <ImageViewing
                    images={images}
                    imageIndex={0}
                    visible={isVisible}
                    onRequestClose={() => setIsVisible(false)}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});

export default BusinessCardScreen2;