import React from 'react';
import { Animated, FlatList, Linking, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BusinessListing = () => {

    const businessList = [
        {
            name: 'Vishw Prajapati',
            role: 'God of Asgrad tours and travells',
            phoneNumber: '+919173211901',
            address: 'B-382 Nishitpark aadinathnagar odhav ahmedabad',
            email: 'vishwprajapati66@gmail.com'
        },
        {
            name: 'Vishw Prajapati',
            role: 'Owner of Asgrad',
            phoneNumber: '+919173211901',
            address: 'B-382 Nishitpark aadinathnagar odhav ahmedabad',
            email: 'vishwprajapati66@gmail.com'
        },
        {
            name: 'Vishw Prajapati',
            role: 'Owner of Asgrad',
            phoneNumber: '+919173211901',
            address: 'B-382 Nishitpark aadinathnagar odhav ahmedabad',
            email: 'vishwprajapati66@gmail.com'
        },
        {
            name: 'Vishw Prajapati',
            role: 'Owner of Asgrad',
            phoneNumber: '+919173211901',
            address: 'B-382 Nishitpark aadinathnagar odhav ahmedabad',
            email: 'vishwprajapati66@gmail.com'
        },
        {
            name: 'Vishw Prajapati',
            role: 'Owner of Asgrad',
            phoneNumber: '+919173211901',
            address: 'B-382 Nishitpark aadinathnagar odhav ahmedabad',
            email: 'vishwprajapati66@gmail.com'
        },
    ];

    const handleCallOpenLink = (phoneNumber) => {
        if (phoneNumber) {
            Linking.openURL(`tel:${phoneNumber}`);
        }
    };

    const handleClickOnMail = (mail) => {
        if (mail) {
            Linking.openURL(`mailto:${mail}`);
        }
    };


    const renderItem = ({ item, index }) => {
        const backgroundColor = index % 2 === 0 ? '#0056b3' : 'orange';
        const animation = new Animated.Value(0);
        const inputRange = [0, 1];
        const outputRange = [1, 0.8];
        const scale = animation.interpolate({ inputRange, outputRange });

        const onPressIn = () => {
            Animated.spring(animation, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        };

        const onPressOut = () => {
            Animated.spring(animation, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        };


        return (
            <View className="p-3">
                <Animated.View style={[{ transform: [{ scale }] }]} className="flex justify-center items-center">
                    <TouchableOpacity
                        activeOpacity={1}
                        onPressIn={onPressIn}
                        onPressOut={onPressOut}
                    >
                        <LinearGradient
                            colors={[backgroundColor, backgroundColor]}
                            className="overflow-hidden rounded-lg"
                        >
                            <View className="p-4 flex flex-row">
                                <View>
                                    <Text className="text-white text-2xl w-64 font-bold">{item.name}</Text>
                                    <Text className="text-white text-lg w-64 mb-4">{item.role}</Text>
                                </View>
                                <View className="w-40 h-50" style={{ height: 40, backgroundColor: '#ffffff', transform: [{ rotate: '45deg' }], position: 'absolute', top: -20, right: -20 }} />
                            </View>

                            <View className="bg-white p-4">
                                <View className="flex flex-row flex-wrap items-center">
                                    <Text className="text-black text-lg font-bold">Mobile Number : </Text>
                                    <TouchableOpacity onPress={() => handleCallOpenLink(item.phoneNumber)}>
                                        <Text className="text-[#5176df] tracking-wider text-md font-medium">{item.phoneNumber}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View className="flex flex-row flex-wrap items-center">
                                    <Text className="text-black text-lg font-bold">Address : </Text>
                                    <TouchableOpacity
                                        className="ms-2"
                                        onPress={() => Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(item.address))}
                                    >
                                        <Text className="text-[#5176df] tracking-wider text-md font-medium">{item.address}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View className="flex flex-row flex-wrap items-center">
                                    <Text className="text-black text-lg font-bold">Website Link : </Text>
                                    <TouchableOpacity onPress={() => handleClickOnMail(item.email)}>
                                        <Text className="text-[#5176df] tracking-wider text-md font-medium">{item.email}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    };

    return (
        <View className="bg-[#E9EDF7] h-full">
            <FlatList
                data={businessList}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default BusinessListing;
