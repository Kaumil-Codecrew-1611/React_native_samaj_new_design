import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Dimensions, Image, Keyboard, Pressable, Text, TouchableWithoutFeedback, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ImageViewing from 'react-native-image-viewing';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DefaultImage from '../../../assets/profile_img.png';
import Carousel from '../../../components/Carousel';
import HomePageCardContents from '../../../components/HomePageCardsIcons/HomePageCardContents';
import NewsHomePageContent from '../../../components/HomePageCardsIcons/NewsHomePageContent';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';
import i18n from '../../../context/i18n';

const Home = ({ navigation }) => {

    const { t } = useTranslation();
    const { isLoggedIn, allUserInfo, progress } = useContext(GlobalContext);
    const { homePageAllSlider, contactUsPageDetails } = useContext(ApiContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [sliderImages, setSliderImages] = useState([]);
    const [titleOfHeader, setTitleOfHeader] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [windowWidth] = useState(Dimensions.get('window').width);
    const animation = new Animated.Value(0);
    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const scale = animation.interpolate({ inputRange, outputRange });
    const images = [
        { uri: `${process.env.IMAGE_URL}${allUserInfo?.photo}` },
    ];

    const cards = [
        { id: 1, name: t('aboutUs'), redirectTo: "Aboutus", image: require('../../../assets/aboutusicons.png') },
        { id: 2, name: t('villages'), redirectTo: "VillageListing", image: require('../../../assets/villageIcon.png') },
        isLoggedIn ?
            { id: 3, name: t('profile'), redirectTo: "Profile", image: require('../../../assets/prifileImage.png') } :
            { id: 4, name: t('joinnow'), redirectTo: "Welcome", image: require('../../../assets/join.png') },
        { id: 5, name: t('Directory'), redirectTo: "AllUserDirectory", image: require('../../../assets/villageIcon.png') },
        { id: "", name: "", redirectTo: "", image: "" },
        { id: "", name: "", redirectTo: "", image: "" },
    ];

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

    useEffect(() => {
        (async function () {
            const contentContactUs = await contactUsPageDetails();
            const desiredKeys = ["appheading"];
            contentContactUs.forEach((item) => {
                if (desiredKeys.includes(item.key)) {
                    switch (item.key) {
                        case 'appheading':
                            setTitleOfHeader(item.value);
                            break;
                        default:
                            break;
                    }
                }
            });
        })();
    }, []);

    useEffect(() => {
        const getSelectedLanguage = async () => {
            try {
                const storedLanguage = await AsyncStorage.getItem('selectedLanguage');
                if (storedLanguage) {
                    i18n.changeLanguage(storedLanguage).catch((error) => {
                        console.error('Error changing language:', error);
                    });
                }
            } catch (error) {
                console.error('Error retrieving language:', error);
            }
        };
        getSelectedLanguage();
    }, []);

    useEffect(() => {
        (async function () {
            setFirstName(allUserInfo?.firstname);
            setLastName(allUserInfo?.lastname);

            const result = await homePageAllSlider();
            setSliderImages(result);
        })();
    }, [allUserInfo]);

    const renderItem = ({ item }) => (
        <View className="flex-1 flex-row justify-around mt-5">
            <HomePageCardContents
                content={item.name}
                redirectTo={item.redirectTo}
                navigation={navigation}
                thumbnail={item.thumbnail}
                functionality={item.functionality}
                image={item.image}
                idx={item.id}
            />
        </View>
    );

    const profileNavigate = () => {
        if (isLoggedIn) {
            progress.value = withTiming("3");
            navigation.navigate("Profile");
        }
    };

    const openProfileImage = (e) => {
        e.stopPropagation();
        setIsVisible(true);
    }

    return (
        <>
            <View className="flex-1 bg-[#E9EDF7] space-y-3 w-full pb-20" edges={['top']}>
                <Pressable onPress={profileNavigate} className="bg-white h-fit flex items-center" style={{ alignSelf: 'stretch' }}>
                    <View className="flex-row justify-around my-3 w-full items-center ">
                        <View className="space-y-1 basis-2/3 justify-center px-5">
                            {firstName && lastName && (
                                <Text className="font-semibold tracking-wider text-neutral-700 text-2xl">
                                    {t("welcome")}
                                </Text>
                            )}
                            <Text className={`${windowWidth < 321 ? "text-base" : "text-xl"} font-semibold tracking-wider text-rose-700`}>
                                {firstName && lastName
                                    ? `${firstName} ${lastName}`
                                    : titleOfHeader}
                            </Text>
                        </View>
                        <Animated.View style={[{ transform: [{ scale }] }]}>
                            <Pressable
                                activeOpacity={1}
                                onPressIn={onPressIn}
                                onPressOut={onPressOut}
                                onPress={openProfileImage}
                            >
                                {allUserInfo && Object.entries(allUserInfo).length > 0 && allUserInfo.photo ? (
                                    <Image source={{ uri: process.env.IMAGE_URL + allUserInfo.photo }} style={{ height: hp(10), width: hp(10), borderRadius: hp(5) }} />
                                ) : (
                                    <Image source={DefaultImage} style={{ height: hp(10), width: hp(10), borderRadius: hp(5) }} />
                                )}
                            </Pressable>
                        </Animated.View>
                    </View>
                </Pressable>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <FlatList
                            data={cards}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={3}
                            key={cards[0].id}
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ display: 'flex', gap: 2, width: '100%', paddingHorizontal: 3 }}
                            ListHeaderComponent={<Carousel sliderImages={sliderImages} />}
                        />
                        <NewsHomePageContent navigation={navigation} />
                    </ScrollView>
                </TouchableWithoutFeedback>
            </View>
            <ImageViewing
                images={allUserInfo ? images : [DefaultImage]}
                imageIndex={0}
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
            />
        </>
    );
};

export default Home;