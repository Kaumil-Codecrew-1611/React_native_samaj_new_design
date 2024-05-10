/* import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    LogBox,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

const Carousel = () => {
    const flatlistRef = useRef();
    // Get Dimesnions
    const screenWidth = Dimensions.get("window").width;
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto Scroll

    useEffect(() => {
        let interval = setInterval(() => {
            if (activeIndex === carouselData.length - 1) {
                flatlistRef.current.scrollToIndex({
                    index: 0,
                    animation: true,
                });
            } else {
                flatlistRef.current.scrollToIndex({
                    index: activeIndex + 1,
                    animation: true,
                });
            }
        }, 2000);

        return () => clearInterval(interval);
    });

    const getItemLayout = (data, index) => ({
        length: screenWidth,
        offset: screenWidth * index, // for first image - 300 * 0 = 0pixels, 300 * 1 = 300, 300*2 = 600
        index: index,
    });
    // Data for carousel
    const carouselData = [
        {
            id: "01",
            image: "https://images.pexels.com/photos/19987212/pexels-photo-19987212/free-photo-of-green-tree-over-lake-in-village.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
            id: "02",
            image: "https://images.pexels.com/photos/19987294/pexels-photo-19987294/free-photo-of-dirt-road-by-house-in-village.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            id: "03",
            image: "https://images.pexels.com/photos/19979516/pexels-photo-19979516/free-photo-of-houses-on-lakeshore-in-village.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            id: "04",
            image: "https://images.pexels.com/photos/19979544/pexels-photo-19979544/free-photo-of-forest-and-village-on-sea-coast.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
    ];

    //  Display Images // UI
    const renderItem = ({ item, index }) => {
        return (
            <View key={item.id}>
                <Image
                    source={{ uri: item.image }}
                    style={{ height: 200, width: screenWidth }}
                />
            </View>
        );
    };

    // Handle Scroll
    const handleScroll = (event) => {
        // Get the scroll position
        const scrollPosition = event.nativeEvent.contentOffset.x;
        // Calculate the index based on the scroll position
        const index = Math.round(scrollPosition / screenWidth);
        // Update the active index state
        setActiveIndex(index);
    };

    // Render Dot Indicators
    const renderDotIndicators = () => {
        return carouselData.map((dot, index) => {
            // if the active index === index

            if (activeIndex === index) {
                return (
                    <View
                        style={{
                            backgroundColor: "green",
                            height: 10,
                            width: 10,
                            borderRadius: 5,
                            marginHorizontal: 6,
                        }}
                    ></View>
                );
            } else {
                return (
                    <View
                        key={index}
                        style={{
                            backgroundColor: "red",
                            height: 10,
                            width: 10,
                            borderRadius: 5,
                            marginHorizontal: 6,
                        }}
                    ></View>
                );
            }
        });
    };

    return (
        <View>
            <FlatList
                data={carouselData}
                ref={flatlistRef}
                getItemLayout={getItemLayout}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
                pagingEnabled={true}
                onScroll={handleScroll}
            />

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 30,
                }}
            >
                {renderDotIndicators()}
            </View>
        </View>
    );
};

export default Carousel;

const styles = StyleSheet.create({}); */

import { useState } from "react";
import { Animated, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
    useSharedValue
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";


const PAGE_WIDTH = Dimensions.get('window').width;


export const list = [
    {
        id: '1',
        title: 'First Item',
        color: '#26292E',
        img: "https://images.pexels.com/photos/19987212/pexels-photo-19987212/free-photo-of-green-tree-over-lake-in-village.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: '2',
        title: 'Second Item',
        color: '#899F9C',
        color: '#899F9C',
        img: "https://images.pexels.com/photos/19987294/pexels-photo-19987294/free-photo-of-dirt-road-by-house-in-village.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: '3',
        title: 'Third Item',
        color: '#B3C680',
        img: "https://images.pexels.com/photos/19979516/pexels-photo-19979516/free-photo-of-houses-on-lakeshore-in-village.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: '4',
        title: 'Fourth Item',
        color: '#5C6265',
        img: "https://images.pexels.com/photos/19979544/pexels-photo-19979544/free-photo-of-forest-and-village-on-sea-coast.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
];

function Parallax() {
    const [isVertical, setIsVertical] = useState(false);
    const [autoPlay, setAutoPlay] = useState(true);
    const [pagingEnabled, setPagingEnabled] = useState(true);
    const [snapEnabled, setSnapEnabled] = useState(true);
    const progressValue = useSharedValue(0);
    const baseOptions = isVertical
        ? {
            vertical: true,
        }
        :
        {
            vertical: false,
            width: PAGE_WIDTH,
            height: PAGE_WIDTH * 0.6,
        };

    return (
        <View
            style={{
                alignItems: "center",
                height: PAGE_WIDTH * 0.6 + 12
            }}
            className="flex bg-white mx-3 p-2 rounded-2xl overflow-hidden"
        >
            <Carousel
                style={{ alignSelf: 'stretch', display: "flex", gap: 8 }}
                className="px-2 mx-5"
                width={PAGE_WIDTH - 15}
                height={PAGE_WIDTH * 0.6}
                vertical={false}

                loop
                pagingEnabled={pagingEnabled}
                snapEnabled={snapEnabled}
                autoPlay={autoPlay}
                autoPlayInterval={1500}
                onProgressChange={(_, absoluteProgress) =>
                    (progressValue.value = absoluteProgress)
                }
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}

                data={list}
                scrollAnimationDuration={1000}
                renderItem={({ item }) => (
                    <View

                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignSelf: "center",
                            backgroundColor: item?.color,
                            overflow: "hidden",
                            borderRadius: 15
                        }}
                    >
                        <LinearGradient className="flex-1" colors={['rgba(0, 0.3, 0, 0.3)', 'rgba(0.2, 0.4, 0.4, 0.8)']} style={styles.gradient}>

                            <Animated.Image style={styles.img} source={{ uri: item.img }} />
                            <Animated.View style={styles.container}>
                                <Text style={styles.title}>Hey There</Text>
                            </Animated.View>
                        </LinearGradient>
                    </View>
                )}
            />
        </View>
    );
}


export default Parallax;


const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 20
    },
    img: {
        height: '100%',
        width: '100%',
        position: 'relative',
        background: "linear - gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9))"
    },
    title: {
        fontSize: 20,
        color: "#fff"
    }
})