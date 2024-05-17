import React, { useState } from 'react';
import { Dimensions, ScrollView, Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset, useSharedValue } from 'react-native-reanimated';

const { width } = Dimensions.get('window')
const IMG_HEIGHT = 300

const Aboutus = () => {

    const scrollRef = useAnimatedRef();
    const scrolloffset = useScrollViewOffset(scrollRef);

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrolloffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
                    ),

                },
                {
                    scale: interpolate(
                        scrolloffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [2, 1, 1]
                    )
                }
            ]
        }
    })
    const scrollY = useSharedValue(0);

    const headerHeight = useSharedValue(0);
    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: -scrollY.value }],
            height: headerHeight.value,
            opacity: interpolate(scrollY.value, [0, IMG_HEIGHT / 2], [1, 0]),
        };
    });

    /*  const handleScroll = (event) => {
         scrollY.value = event.nativeEvent.contentOffset.y;
     }; */
    const handleScroll = (event) => {
        scrollY.value = event.nativeEvent.contentOffset.y;
    };
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header, headerAnimatedStyle]}>
                <Text className="font-bold text-3xl">Your Header</Text>
            </Animated.View>
            <Animated.ScrollView onScroll={handleScroll} ref={scrollRef} scrollEventThrottle={16}>
                <View>
                    <Animated.Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGsmGhSaJcQOzDWEwYB31PkUQZTsCsW4YZmQYh6B2c7Q&s' }}
                        style={[styles.image, imageAnimatedStyle]} />

                </View>

                <View className="bg-white">

                    <View className="ml-[10px]">
                        <Text className="tracking-wider text-neutral-700 font-semibold text-3xl">About Us.</Text>
                        <View className="w-12 h-2 bg-red-400 my-2 rounded"></View>
                        <Text className="text-[17px] font-medium mt-[10px]">
                            Were on a missionto add relevancy to every online experince
                        </Text>
                    </View>


                    <TouchableOpacity className="flex items-center justify-center bg-rose-400 h-10 w-40 ml-3 mt-4 mb-10 rounded">
                        <Text className="tracking-wider text-neutral-700 font-medium text-base">Learn More</Text>
                    </TouchableOpacity>

                    <View className="p-[10px]">
                        <Text className="tracking-wider text-neutral-700 font-semibold text-3xl">Our Purpose</Text>
                        <View className="w-12 h-2 bg-red-400 my-2 rounded"></View>
                        <Text className="tracking-wider text-neutral-700 font-medium text-base">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur repellat, iste iusto, culpa recusandae fugiat deserunt molestias praesentium nulla magnam tenetur! Sit neque sapiente tempore, laudantium perferendis eius tenetur dicta.
                        </Text>
                    </View>

                    <View className="mt-4">
                        <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGsmGhSaJcQOzDWEwYB31PkUQZTsCsW4YZmQYh6B2c7Q&s' }}
                            style={[styles.image]} />
                    </View>

                    <View className="p-[10px]">
                        <Text className="tracking-wider text-neutral-700 font-semibold text-3xl">Our Approach</Text>
                        <View className="w-12 h-2 bg-red-400 my-2 rounded"></View>
                        <Text className="tracking-wider text-neutral-700 font-medium text-base">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur repellat, iste iusto, culpa recusandae fugiat deserunt molestias praesentium nulla magnam tenetur! Sit neque sapiente tempore, laudantium perferendis eius tenetur dicta.
                        </Text>
                        <Text className="tracking-wider text-neutral-700 font-medium text-base mt-8">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur repellat, iste iusto, culpa recusandae fugiat deserunt molestias praesentium nulla magnam tenetur! Sit neque sapiente tempore, laudantium perferendis eius tenetur dicta.
                        </Text>
                    </View>

                    <TouchableOpacity className="flex items-center justify-center bg-rose-400 h-10 w-40 ml-3 mt-4 mb-20  rounded">
                        <Text className="tracking-wider text-neutral-700 font-medium text-base">Learn More</Text>
                    </TouchableOpacity>
                </View>
            </Animated.ScrollView>
        </View>
    );
};

export default Aboutus;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width,
        height: IMG_HEIGHT,
    },

});
