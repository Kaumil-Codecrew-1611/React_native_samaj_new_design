import { Image, Text, View } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { Animated, Linking, TouchableOpacity } from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import Fontisto from 'react-native-vector-icons/Fontisto';
import TwitterIcon from '../../../../assets/twitter.svg';
import ApiContext from '../../../../context/ApiContext';
import { GlobalContext } from '../../../../context/globalState';

const Card1 = () => {

    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const [contactno1, setContactno1] = useState('');
    const [contactno2, setContactno2] = useState('');
    const [twitterLink, setTwitterLink] = useState('');
    const [faceBookLink, setFaceBookLink] = useState('');
    const [instagramLink, setInstagramLink] = useState('');
    const [linkedinLink, setLinkedinLink] = useState('');
    const twitterAnimation = new Animated.Value(0);
    const instaAnimation = new Animated.Value(0);
    const faceBookAnimation = new Animated.Value(0);
    const linkedinAnimation = new Animated.Value(0);
    const profileAnimation = new Animated.Value(0);
    const [isVisible, setIsVisible] = useState(false);
    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);
    const twitterScale = twitterAnimation.interpolate({ inputRange, outputRange });
    const instaScale = instaAnimation.interpolate({ inputRange, outputRange });
    const faceBookScale = faceBookAnimation.interpolate({ inputRange, outputRange });
    const linkedinScale = linkedinAnimation.interpolate({ inputRange, outputRange });
    const profileBusinessScale = profileAnimation.interpolate({ inputRange, outputRange });
    const { allUserInfo } = useContext(GlobalContext);
    const { contactUsPageDetails } = useContext(ApiContext);
    const images = [(allUserInfo && allUserInfo.photo) ? { uri: `${process.env.IMAGE_URL}${allUserInfo.photo}` } : require("../../../../assets/profile_img.png")];

    useEffect(() => {
        (async function () {
            const contentContactUs = await contactUsPageDetails();
            const desiredKeys = ['contact1', 'contactno1', 'contact2', 'contactno2', 'email', "instagram", "facebook", "twitter", "linkedin"];
            contentContactUs.forEach((item) => {
                if (desiredKeys.includes(item.key)) {
                    switch (item.key) {
                        case 'contactno1':
                            setContactno1(item.value);
                            break;
                        case 'contactno2':
                            setContactno2(item.value);
                            break;
                        case 'instagram':
                            setInstagramLink(item.value);
                            break;
                        case 'facebook':
                            setFaceBookLink(item.value);
                            break;
                        case 'twitter':
                            setTwitterLink(item.value);
                            break;
                        case 'linkedin':
                            setLinkedinLink(item.value);
                            break;
                        default:
                            break;
                    }
                }
            });
            setLoading(false);
        })();
    }, []);

    const onPressInTwitter = () => {
        Animated.spring(twitterAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressOutTwitter = () => {
        Animated.spring(twitterAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressInInsta = () => {
        Animated.spring(instaAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressOutInsta = () => {
        Animated.spring(instaAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressInFaceBook = () => {
        Animated.spring(faceBookAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressOutFaceBook = () => {
        Animated.spring(faceBookAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressInLinkedin = () => {
        Animated.spring(linkedinAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressOutLinkedin = () => {
        Animated.spring(linkedinAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

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

    const openLink = (url) => {
        if (url) {
            Linking.openURL(url);
        }
    };

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

    const handlePress = () => {
        Linking.openURL('https://international.ajaymodi.com/');
    };

    return (
        <View>
            <View className="bg-white h-full rounded-2xl p-5 w-full max-w-md shadow-lg relative overflow-hidden">
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

                <View className="border-b-2 border-gray-300 mb-4"></View>

                <View className="w-full">
                    <View className="flex flex-row items-center flex-wrap mb-2">
                        <Text className="text-black text-base font-bold tracking-wide">Mobile Number :- </Text>
                        <TouchableOpacity onPress={() => handleCallOpenLink("+91" + contactno1)}>
                            <View>
                                <Text className="text-[#5176df] text-sm font-semibold">
                                    +91 {contactno1}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <Text> , </Text>
                        <TouchableOpacity onPress={() => handleCallOpenLink("+91" + contactno2)}>
                            <View>
                                <Text className="text-[#5176df] tracking-wider text-sm font-semibold">
                                    +91 {contactno2}
                                </Text>
                            </View>
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

                        <Text className="text-black text-base font-bold tracking-wide">Company Email :- </Text>
                        <TouchableOpacity onPress={() => handleClickOnMail("vishwprajapati66@gmail.com")}>
                            <Text className="text-[#5176df] text-md font-medium">vishwprajapati66@gmail.com</Text>
                        </TouchableOpacity>

                    </View>
                    <View className="flex flex-row items-center flex-wrap mb-2">

                        <Text className="text-black text-base font-bold tracking-wide">Website :- </Text>
                        <TouchableOpacity onPress={handlePress}>
                            <Text className="text-[#5176df] text-sm font-semibold">https://international.ajaymodi.com/</Text>
                        </TouchableOpacity>

                    </View>

                </View>

                <View>
                    <Text className="text-center text-md text-black font-semibold mt-2">Connect with me on</Text>
                </View>

                <View className="flex flex-row justify-around items-center mt-3">

                    <TouchableOpacity
                        activeOpacity={1}
                        onPressIn={onPressInFaceBook}
                        onPressOut={onPressOutFaceBook}
                        onPress={() => openLink(faceBookLink)}
                    >
                        <Animated.View style={[{ transform: [{ scale: faceBookScale }] }]}>
                            <AnimatedFontistoIcon
                                name="facebook"
                                size={40}
                                color="#0866ff"
                            />
                        </Animated.View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPressIn={onPressInLinkedin}
                        onPressOut={onPressOutLinkedin}
                        onPress={() => openLink(linkedinLink)}
                    >
                        <Animated.View style={[{ transform: [{ scale: linkedinScale }] }]}>
                            <AnimatedFontistoIcon
                                name="linkedin"
                                size={40}
                                color="#0866ff"
                            />
                        </Animated.View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPressIn={onPressInInsta}
                        onPressOut={onPressOutInsta}
                        onPress={() => openLink(instagramLink)}
                    >
                        <Animated.View style={[{ transform: [{ scale: instaScale }] }]}>
                            <AnimatedFontistoIcon
                                name="instagram"
                                size={40}
                                color="#f700b2"
                            />
                        </Animated.View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPressIn={onPressInTwitter}
                        onPressOut={onPressOutTwitter}
                        onPress={() => openLink(twitterLink)}
                    >
                        <Animated.View style={[{ transform: [{ scale: twitterScale }] }]}>
                            <TwitterIcon width={40} height={40} color='red' />
                        </Animated.View>
                    </TouchableOpacity>

                </View>
            </View>

            <ImageViewing
                images={images}
                imageIndex={0}
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
            />
        </View>
    )
}

export default Card1