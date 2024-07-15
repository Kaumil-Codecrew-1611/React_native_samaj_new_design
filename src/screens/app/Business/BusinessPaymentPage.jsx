import React, { useCallback, useMemo } from 'react';
import { Animated, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

const ChangePassword = ({ route }) => {

    console.log("routerouterouteroute", route.params)
    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const animation = useMemo(() => new Animated.Value(0), []);
    const scale = animation.interpolate({ inputRange, outputRange });

    const onPressIn = useCallback(() => {
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }, [animation]);

    const onPressOut = useCallback(() => {
        Animated.spring(animation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    }, [animation]);

    return (

        <View className="flex-1 bg-[#E9EDF7] p-2">
            <View className="bg-white mx-2 h-[80%] rounded-tl-[30px] rounded-tr-[30px] absolute bottom-0 left-0 right-0">
                <View className="absolute top-[-35] left-0 right-0 items-center">
                    <Text className="bg-[#4e63ac] text-white text-xl font-bold rounded-[18px] p-5">Payment for business card</Text>
                </View>
                <View className="flex flex-1 p-8 pt-12" style={styles.contentContainer}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        className="flex flex-1"
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View className="w-full">
                                    <View className="flex flex-row items-center">
                                        <Text className="w-[40%] text-[18px] text-black font-semibold my-3">
                                            Name :-
                                        </Text>
                                        <Text className="w-[60%] text-justify text-md text-black font-semibold my-3">
                                            Prajapati Vishw Amitbhai
                                        </Text>
                                    </View>
                                    <View className="flex flex-row items-center">
                                        <Text className="w-[40%] text-[18px] text-black font-semibold my-3">
                                            Company Email :-
                                        </Text>
                                        <Text className="w-[60%] text-justify text-md text-black font-semibold my-3">
                                            vishwprajapati66@gmail.com
                                        </Text>
                                    </View>
                                    <View className="flex flex-row items-center">
                                        <Text className="w-[40%] text-[18px] text-black font-semibold my-3">
                                            Company Name :-
                                        </Text>
                                        <Text className="w-[60%] text-justify text-md text-black font-semibold my-3">
                                            Asgard tours and travels
                                        </Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                    <Animated.View style={[{ transform: [{ scale }] }]}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPressIn={onPressIn}
                            onPressOut={onPressOut}
                        >
                            <View className="bg-[#4e63ac] rounded-xl p-3">
                                <Text className="text-white text-lg font-bold text-center">Pay Now</Text>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    fieldContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
    link: {
        color: '#007AFF',
        textDecorationLine: 'underline',
    },

});

export default ChangePassword;