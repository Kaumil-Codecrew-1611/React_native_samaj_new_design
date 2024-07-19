import { Pressable } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Fontisto from 'react-native-vector-icons/Fontisto';
import TwitterIcon from '../../../../assets/twitter.svg';

const BusinessCard = () => {

    const [flipped, setFlipped] = useState(false);
    const flipAnim = useRef(new Animated.Value(0)).current;
    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const instaAnimation = new Animated.Value(0);
    const twitterAnimation = new Animated.Value(0);
    const linkedinAnimation = new Animated.Value(0);
    const faceBookAnimation = new Animated.Value(0);
    const [twitterLink, setTwitterLink] = useState('');
    const [faceBookLink, setFaceBookLink] = useState('');
    const [instagramLink, setInstagramLink] = useState('');
    const [linkedinLink, setLinkedinLink] = useState('');
    const flipAnimation = useRef(new Animated.Value(0)).current;
    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);
    const instaScale = instaAnimation.interpolate({ inputRange, outputRange });
    const twitterScale = twitterAnimation.interpolate({ inputRange, outputRange });
    const faceBookScale = faceBookAnimation.interpolate({ inputRange, outputRange });
    const linkedinScale = linkedinAnimation.interpolate({ inputRange, outputRange });

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

    const flipStyle = {
        transform: [
            {
                rotateY: flipAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                }),
            },
        ],
    };

    const handleFlip = () => {
        const toValue = flipped ? 0 : 1;
        Animated.timing(flipAnim, {
            toValue: toValue,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {
            setFlipped(!flipped);
        });
    };

    const frontAnimatedStyle = {
        transform: [
            { rotateY: flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }
        ],
        zIndex: flipped ? 0 : 1,
    };

    const backAnimatedStyle = {
        transform: [
            { rotateY: flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] }) }
        ],
        zIndex: flipped ? 1 : 0,
    };

    const handleCallOpenLink = (phoneNumber) => {
        console.log("Call link pressed: ", phoneNumber);
        Linking.openURL(`tel:${phoneNumber}`);
    };

    const handleClickOnMail = (emailAddress) => {
        console.log("Email link pressed: ", emailAddress);
        Linking.openURL(`mailto:${emailAddress}`);
    };

    const openLink = (url) => {
        if (url) {
            console.log("URL link pressed: ", url);
            Linking.openURL(url);
        }
    };

    const renderSocialIcons = () => (
        <>
            <View className="flex flex-row justify-around mt-6">

                <Animated.View style={[{ transform: [{ scale: faceBookScale }] }]}>
                    <TouchableOpacity activeOpacity={1} onPress={() => openLink(faceBookLink)}>
                        <Pressable
                            activeOpacity={1}
                            onPressIn={onPressFacebookIn}
                            onPressOut={onPressFacebookOut}
                        >
                            <AnimatedFontistoIcon name="facebook" size={30} color="#0866ff" />
                        </Pressable>
                    </TouchableOpacity>
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

            </View>
        </>
    );

    const renderCard = (content) => (
        <View>
            <LinearGradient
                colors={['#5c86f7', '#9ab1e1', "#fff"]}
                className="h-24 rounded-tl-xl rounded-tr-xl flex flex-row justify-center items-center"
            >
                <View>
                    <Image
                        className="h-16 w-64"
                        source={require("../../../../assets/logoSecondTemplate.png")}
                        alt='profile-img'
                    />
                </View>
            </LinearGradient>

            <View className="bg-white px-5" style={{ height: 380 }}>
                {content}
            </View>

            <View className="h-20 rounded-bl-xl bg-white rounded-br-xl">
                {renderSocialIcons()}
            </View>
        </View>
    );

    const frontContent = (
        <View>
            <Text className="text-xl text-black font-bold">
                Vishw Prajapati
            </Text>
            <Text className="text-base text-gray-800 font-semibold mt-1">
                Owner of Asgard Tours and Travels
            </Text>
            <Text className="text-base text-gray-800 font-semibold mt-1">
                Travel Company - Since 2002
            </Text>
            <View className="flex flex-row items-center flex-wrap mb-2 mt-2">
                <Text className="text-black text-base font-bold tracking-wide">Mobile Number :- </Text>
                <TouchableOpacity onPress={() => handleCallOpenLink("9173211901")}>
                    <View>
                        <Text style={{ color: '#5176df', fontSize: 14, fontWeight: 'bold' }}>
                            +91 9173211901
                        </Text>
                    </View>
                </TouchableOpacity>
                <Text> , </Text>
                <TouchableOpacity onPress={() => handleCallOpenLink("+91" + "8490820875")}>
                    <View>
                        <Text className="text-[#5176df] tracking-wider text-sm font-semibold">
                            +91 8490820875
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View className="flex flex-row items-center flex-wrap mb-2">
                <Text className="text-black text-base font-bold tracking-wide">Website :- </Text>
                <TouchableOpacity onPress={() => openLink('https://international.ajaymodi.com/')}>
                    <Text className="text-[#5176df] text-sm font-semibold">https://international.ajaymodi.com/</Text>
                </TouchableOpacity>
            </View>
            <View className="flex flex-row items-center flex-wrap mb-2">
                <Text className="text-black text-base font-bold tracking-wide">Company Email :- </Text>
                <TouchableOpacity onPress={() => handleClickOnMail("vishwprajapati66@gmail.com")}>
                    <Text className="text-[#5176df] text-md font-medium">vishwprajapati66@gmail.com</Text>
                </TouchableOpacity>
            </View>
            <View className="flex flex-row items-center flex-wrap mb-2">
                <Text className="text-black text-base font-bold tracking-wide">Address :- </Text>
                <TouchableOpacity
                    className="ms-2"
                    onPress={() => Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent("B-382 Nishitpark aadinathnagar odhav ahmedabad"))}
                >
                    <Text className="text-[#5176df] text-md font-medium">B-382 Nishitpark aadinathnagar odhav ahmedabad</Text>
                </TouchableOpacity>
            </View>
            <View className="flex flex-row items-center flex-wrap mb-2">
                <Text className="text-black text-base font-bold tracking-wide">Short Description :- </Text>
                <Text className="text-black text-sm text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</Text>
            </View>
        </View>
    );

    const backContent = (
        <>
            <View className="flex flex-row items-center flex-wrap mb-2">
                <Text className="text-black text-base font-bold tracking-wide">Long description :- </Text>
                <Text className="text-black text-sm text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Morbi ut ultrices felis. Curabitur ultricies, nisi nec interdum facilisis, nulla dolor.</Text>
            </View>
            <View className="flex flex-row items-center flex-wrap mb-2">
                <Text className="text-black text-base font-bold tracking-wide">Create at this card :- </Text>
                <Text className="text-black text-sm text-justify">16/05/2024</Text>
            </View>
        </>
    );

    const startFlipAnimation = () => {
        Animated.timing(flipAnimation, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            flipAnimation.setValue(0);
        });
    };

    useEffect(() => {
        startFlipAnimation();
    }, []);

    return (

        <View className="flex flex-1 bg-[#E6F2FF] items-center justify-start mt-5">
            <View style={{ width: 350, height: 550 }}>
                <Animated.View style={[frontAnimatedStyle, { backfaceVisibility: 'hidden', position: 'absolute', width: '100%', height: '100%' }]}>
                    {renderCard(frontContent)}
                </Animated.View>
                <Animated.View style={[backAnimatedStyle, { backfaceVisibility: 'hidden', position: 'absolute', width: '100%', height: '100%' }]}>
                    {renderCard(backContent)}
                </Animated.View>
            </View>

            <View className="mt-3">
                <Animated.View style={flipStyle}>
                    <TouchableOpacity
                        className={`rounded p-2 w-14 h-14 flex justify-center items-center`}
                        onPress={handleFlip}
                        activeOpacity={1}
                    >
                        <Image
                            source={require("../../../../assets/next.png")}
                            className="w-full h-full"
                        />
                    </TouchableOpacity>
                </Animated.View>
                <Text className="text-base text-black font-medium">Flip Card</Text>
            </View>
        </View>

    );
};

export default BusinessCard;