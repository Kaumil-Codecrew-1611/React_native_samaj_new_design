import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset, useSharedValue } from 'react-native-reanimated';
import RenderHTML from 'react-native-render-html';
import ApiContext from '../../../context/ApiContext';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const Aboutus = () => {

    const scrollRef = useAnimatedRef();
    const scrolloffset = useScrollViewOffset(scrollRef);
    const { aboutUsContentApi } = useContext(ApiContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        (async function () {
            const contentAboutUs = await aboutUsContentApi();
            setTitle(contentAboutUs?.title);
            setDescription(contentAboutUs?.description);
        })();
    }, []);

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
        };
    });

    const scrollY = useSharedValue(0);
    const headerHeight = useSharedValue(0);
    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: -scrollY.value }],
            height: headerHeight.value,
            opacity: interpolate(scrollY.value, [0, IMG_HEIGHT / 2], [1, 0]),
        };
    });

    const handleScroll = (event) => {
        scrollY.value = event.nativeEvent.contentOffset.y;
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header, headerAnimatedStyle]}>
                <Text style={styles.headerText}>Your Header</Text>
            </Animated.View>
            <Animated.ScrollView
                onScroll={handleScroll}
                ref={scrollRef}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View>
                    <Animated.Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGsmGhSaJcQOzDWEwYB31PkUQZTsCsW4YZmQYh6B2c7Q&s' }}
                        style={[styles.image, imageAnimatedStyle]} />
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>About Us</Text>
                        <View style={styles.sectionDivider}></View>
                        <Text style={styles.sectionText}>{title}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Our Purpose</Text>
                        <View style={styles.sectionDivider}></View>
                        <RenderHTML
                            contentWidth={width}
                            source={{ html: description }}
                            tagsStyles={htmlStyles}
                        />
                    </View>
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
    headerText: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        padding: 20,
    },
    image: {
        width,
        height: IMG_HEIGHT,
    },
    contentContainer: {
        backgroundColor: '#fff',
        padding: 10,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#333',
    },
    sectionDivider: {
        width: 50,
        height: 5,
        backgroundColor: 'red',
        marginVertical: 10,
    },
    sectionText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'justify',
    },
    sectionTextMarginTop: {
        marginTop: 20,
    },
    learnMoreButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    learnMoreButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

const htmlStyles = {
    p: {
        fontSize: 16,
        textAlign: 'justify',
        color: '#555',
    },
    strong: {
        fontWeight: 'bold',
    },
    i: {
        fontStyle: 'italic',
    },
};
