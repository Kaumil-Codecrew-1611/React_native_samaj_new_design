import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, Animated, TouchableOpacity, Pressable } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import TwitterIcon from '../../../../assets/twitter.svg';
const renderSocialIcons = () => {

    const [twitterLink, setTwitterLink] = useState('');
    const [faceBookLink, setFaceBookLink] = useState('');
    const [instagramLink, setInstagramLink] = useState('');
    const [linkedinLink, setLinkedinLink] = useState('');

    const inputRange = [0, 1];
    const outputRange = [1, 0.8];

    const instaAnimation = new Animated.Value(0);
    const twitterAnimation = new Animated.Value(0);
    const linkedinAnimation = new Animated.Value(0);
    const faceBookAnimation = new Animated.Value(0);

    const twitterScale = twitterAnimation.interpolate({ inputRange, outputRange });
    const faceBookScale = faceBookAnimation.interpolate({ inputRange, outputRange });
    const linkedinScale = linkedinAnimation.interpolate({ inputRange, outputRange });
    const instaScale = instaAnimation.interpolate({ inputRange, outputRange });

    const onPressFacebookIn = () => {
        Animated.spring(faceBookAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressFacebookOut = () => {
        Animated.spring(faceBookAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressLinkedinIn = () => {
        Animated.spring(linkedinAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressLinkedinOut = () => {
        Animated.spring(linkedinAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressInstagramIn = () => {
        Animated.spring(instaAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressInstagramOut = () => {
        Animated.spring(instaAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressTwitterIn = () => {
        Animated.spring(twitterAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressTwitterOut = () => {
        Animated.spring(twitterAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };
    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);
    return (
        <>
            {/* <View className="flex flex-row justify-around mt-6"> */}

            <Animated.View style={[{ transform: [{ scale: faceBookScale }] }]}>
                {/* <TouchableOpacity activeOpacity={1} onPress={() => openLink(faceBookLink)}> */}
                <Pressable
                    activeOpacity={1}
                    onPressIn={onPressFacebookIn}
                    onPressOut={onPressFacebookOut}
                    onPress={() => openLink(faceBookLink)}
                >
                    <AnimatedFontistoIcon name="facebook" size={30} color="#0866ff" />
                </Pressable>
                {/* </TouchableOpacity> */}
            </Animated.View>

            <Animated.View style={[{ transform: [{ scale: linkedinScale }] }]}>
                <TouchableOpacity activeOpacity={1} onPress={() => openLink(linkedinLink)}>
                    <Pressable
                        activeOpacity={1}
                        onPressIn={onPressLinkedinIn}
                        onPressOut={onPressLinkedinOut}
                    >
                        <AnimatedFontistoIcon name="linkedin" size={30} color="#0866ff" />
                    </Pressable>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[{ transform: [{ scale: instaScale }] }]}>
                <TouchableOpacity activeOpacity={1} onPress={() => openLink(instagramLink)}>
                    <Pressable
                        activeOpacity={1}
                        onPressIn={onPressInstagramIn}
                        onPressOut={onPressInstagramOut}
                    >
                        <AnimatedFontistoIcon name="instagram" size={30} color="#f700b2" />
                    </Pressable>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[{ transform: [{ scale: twitterScale }] }]}>
                <TouchableOpacity activeOpacity={1} onPress={() => openLink(twitterLink)}>
                    <Pressable
                        activeOpacity={1}
                        onPressIn={onPressTwitterIn}
                        onPressOut={onPressTwitterOut}
                    >
                        <TwitterIcon width={30} height={30} color='red' />
                    </Pressable>
                </TouchableOpacity>
            </Animated.View>

            {/* </View> */}
        </>
    )
};
const Template3 = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View >
                <View style={styles.userImageContainer}>
                    <View style={styles.userImage}>
                        <Image source={require('../../../../assets/hero1.jpg')} style={styles.image} />
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.name}>Vishw Prajapati</Text>
                        <Text style={styles.occasion}>Owner of Asgard</Text>
                        <Text style={styles.jobDescription}>Tour and Travels</Text>
                        <Text style={styles.year}>Travel company - Since 2001</Text>
                    </View>
                </View>

                <View style={styles.userDetailsContainer}>
                    <View style={styles.userDetails}>
                        <Text style={styles.userKey}>Company Name :</Text>
                        <Text style={styles.userValue}>Codecrew Infotech pvt.</Text>
                    </View>
                    <View style={styles.userDetails}>
                        <Text style={styles.userKey}>Mobile Number :</Text>
                        <Text style={styles.userValue}>9425710736, 9875469232</Text>
                    </View>
                    <View style={styles.userDetails}>
                        <Text style={styles.userKey}>Address :</Text>
                        <Text style={styles.userValue}>A-29 Akash Society vastral, Ahmedabad</Text>
                    </View>
                    <View style={styles.userDetails}>
                        <Text style={styles.userKey}>Email :</Text>
                        <Text style={styles.userValue}>ccinfotech@gmail.com</Text>
                    </View>
                    <View style={styles.userDetails}>
                        <Text style={styles.userKey}>Website :</Text>
                        <Text style={styles.userValue}>http://127.0.0.1:5500/Panchal-samaj/index.html/</Text>
                    </View>
                    <View style={styles.userDetails}>
                        <Text style={styles.userKey}>Short Description :</Text>
                        <Text style={styles.userValue}>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa fuga iusto laudantium excepturi sit.
                        </Text>
                    </View>
                    <View style={styles.userDetails}>
                        <Text style={styles.userKey}>Long Description :</Text>
                        <Text style={styles.userValue}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias autem ipsam deserunt minima soluta obcaecati ullam ut fuga impedit temporibus, incidunt sit iste cumque
                        </Text>
                    </View>
                </View>

                <View style={styles.userIconsContainer}>
                    {renderSocialIcons()}
                </View>
                <Text style={styles.footer}>Created by 18July2024</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: '100%',
        // borderRadius: 20,
        padding: 10,
        textAlign: 'center',
        backgroundColor: '#ffffff',
        maxWidth: '100%'
    },

    userImageContainer: {
        flexDirection: 'row',
        backgroundColor: '#dfdfdf',
        borderRadius: 10,
        margin: 15,
        padding: 10,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderColor: '#1b83bd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    userImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 60,
    },
    userInfo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        // textAlign: 'center',
    },
    name: {
        fontSize: 23,
        fontWeight: '600',
    },
    occasion: {
        color: 'gray',
        fontSize: 14,
        fontWeight: '600',
    },
    jobDescription: {
        fontSize: 18,
    },
    year: {
        fontSize: 13,
        fontWeight: '600',
    },
    userDetailsContainer: {
        marginTop: 10,
        gap: 10,
        paddingHorizontal: 10
    },
    userDetails: {
        display: 'flex',
        width: "100%",
        flex: 1,
        flexDirection: 'column',
        gap: 10,
        maxWidth: '100%',
        // overflow: 'hidden',
        flexWrap: 'wrap',
        // justifyContent: 'space-between',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#dfdfdf',
    },
    userKey: {
        fontWeight: 'bold',
        color: '#767676',
    },
    userValue: {
        fontWeight: '600',
        fontSize: 15,
        textAlign: 'left',
        // paddingHorizontal: 10,
        // display: 'flex',
        width: "100%",
        // flexWrap: 'wrap',

    },
    userIconsContainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
        marginBottom: 10,
    },
    footer: {
        textAlign: 'center',
        fontSize: 12,
        color: 'gray',
    },
});

export default Template3;
