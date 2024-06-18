import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ImageViewing from 'react-native-image-viewing';
import { withTiming } from 'react-native-reanimated';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DefaultImage from '../../../assets/profile_img.png';
import Carousel from '../../../components/Carousel';
import HomePageCardContents from '../../../components/HomePageCardsIcons/HomePageCardContents';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';
import i18n from '../../../context/i18n';

const Home = ({ navigation }) => {

    const { t } = useTranslation();
    const { isLoggedIn, progress, allUserInfo } = useContext(GlobalContext);
    const { homePageAllSlider, contactUsPageDetails } = useContext(ApiContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [sliderImages, setSliderImages] = useState([]);
    const [titleOfHeader, setTitleOfHeader] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const images = [
        { uri: `${process.env.IMAGE_URL}${allUserInfo?.photo}` },
    ];

    const cards = [
        { id: 1, name: t('aboutUs'), redirectTo: "Aboutus", image: require('../../../assets/aboutusicons.png') },
        { id: 2, name: t('villages'), redirectTo: "VillageListing", image: require('../../../assets/villageIcon.png') },
        isLoggedIn ?
            { id: 3, name: t('profile'), redirectTo: "Profile", image: require('../../../assets/prifileImage.png') } :
            { id: 4, name: "join now", redirectTo: "Welcome", image: require('../../../assets/join.png') },
    ];

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
        <View className="flex-1 flex-row justify-around">
            <HomePageCardContents
                content={item.name}
                redirectTo={item.redirectTo}
                navigation={navigation}
                thumbnail={item.thumbnail}
                functionality={item.functionality}
                size="sm"
                image={item.image}
                idx={item.id}
            />
        </View>
    );

    const profileNavigate = () => {
        if (allUserInfo) {
            progress.value = withTiming("3");
            navigation.navigate("Profile");
        } else {
            console.log("all User Info is null, navigation is not performed");
        }
    };

    const openProfileImage = (e) => {
        e.stopPropagation();
        setIsVisible(true);
    }

    return (
        <>
            <View className="flex-1 bg-gray-300 space-y-3 w-full pb-20" edges={['top']}>
                <Pressable onPress={profileNavigate} className="bg-white h-fit flex items-center" style={{ alignSelf: 'stretch' }}>
                    <View className="flex-row justify-around my-3 w-full items-center ">
                        <View className="space-y-1 basis-2/3 justify-center px-5">

                            {firstName && lastName && (
                                <Text className="font-semibold tracking-wider text-neutral-700 text-2xl">
                                    {t("welcome")}
                                </Text>
                            )}

                            <Text className="font-semibold tracking-wider text-rose-700 text-xl">
                                {firstName && lastName
                                    ? `${firstName} ${lastName}`
                                    : titleOfHeader}
                            </Text>

                        </View>

                        <Pressable onPress={openProfileImage} className="flex justify-center items-center space-y-2 basis-1/3 cursor-pointer">
                            {allUserInfo && Object.entries(allUserInfo).length > 0 && allUserInfo.photo ? (
                                <Image source={{ uri: process.env.IMAGE_URL + allUserInfo.photo }} style={{ height: hp(10), width: hp(10), borderRadius: hp(5) }} />
                            ) : (
                                <Image source={DefaultImage} style={{ height: hp(10), width: hp(10), borderRadius: hp(5) }} />
                            )}
                        </Pressable>

                    </View>
                </Pressable>

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