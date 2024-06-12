import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { withTiming } from 'react-native-reanimated';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DefaultImage from '../../../assets/profile_img.png';
import CardDetails from '../../../components/CardDetails';
import Carousel from '../../../components/Carousel';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';
import i18n from '../../../context/i18n';


import ImageViewing from 'react-native-image-viewing';
import SettingBottomSheet from '../Settings';
import CustomBottomSheet from '../../../components/CustomBottomSheet';
const Home = ({ navigation }) => {
    const { t } = useTranslation();
    const { progress, allUserInfo, setScreenpercentage, openBottomSheet } = useContext(GlobalContext);
    const { homePageAllSlider } = useContext(ApiContext);
    const [firstName, setFirstName] = useState(allUserInfo?.firstname ? allUserInfo?.firstname : "Panchal");
    const [lastName, setLastName] = useState(allUserInfo?.lastname ? allUserInfo?.lastname : "Samaj");

    const [sliderImages, setSliderImages] = useState([]);
    const [language, setLanguage] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const images = [
        { uri: `${process.env.IMAGE_URL}${allUserInfo?.photo}` },
    ];
    const openSettings = () => {
        setScreenpercentage({ first: "30%", second: "34%" });
        openBottomSheet(<SettingBottomSheet />);
    };
    const cards = [
        { id: 1, name: t('aboutUs'), redirectTo: "Aboutus", image: require('../../../assets/aboutus.png') },
        { id: 3, name: t('villages'), redirectTo: "VillageListing", image: require('../../../assets/villageImg.png') },
        { id: 4, name: t('news'), redirectTo: "News", image: require('../../../assets/NewsImg.png') },
        ...[allUserInfo && Object.entries(allUserInfo).length > 0 ?
            { id: 5, name: "", redirectTo: "", image: "" } :
            { id: 5, name: t('settings'), functionality: openSettings, image: require('../../../assets/setting.jpg') }]
    ];

    useEffect(() => {
        const getSelectedLanguage = async () => {
            try {
                const storedLanguage = await AsyncStorage.getItem('selectedLanguage');
                if (storedLanguage) {
                    i18n.changeLanguage(storedLanguage).catch((error) => {
                        console.error('Error changing language:', error);
                    });
                    console.log(storedLanguage, "storedLanguage")
                    setLanguage(storedLanguage);
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
            <CardDetails
                content={item.name}
                redirectTo={item.redirectTo}
                navigation={navigation}
                thumbnail={item.thumbnail}
                functionality={item.functionality}
                size="lg"
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
            console.log("allUserInfo is null, navigation is not performed");
        }
    };


    const openProfileImage = (e) => {
        e.stopPropagation();
        setIsVisible(true);
    }
    allUserInfo && Object.entries(allUserInfo).length > 0 && !allUserInfo.photo ? console.log("if") : console.log("else")
    return (
        <>
            <View className="flex-1 bg-gray-300 space-y-5 w-full pb-20" edges={['top']}>
                <Pressable onPress={profileNavigate} className="bg-white mt-3 mx-1 h-fit rounded-2xl flex items-center" style={{ alignSelf: 'stretch' }}>
                    <View className="flex-row justify-around my-4 w-full items-center mx-1">
                        <View className="space-y-1 basis-2/3 justify-center px-5">
                            <Text style={{ fontSize: hp(4.5) }} className="font-semibold tracking-wider text-neutral-700">
                                {t("welcome")}
                            </Text>
                            <Text style={{ fontSize: hp(3.5) }} className="font-semibold tracking-wider text-rose-700">
                                {!firstName ? "Panchal Samaj" : `${firstName} ${lastName}`}
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
                    numColumns={2}
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
            {allUserInfo && Object.entries(allUserInfo).length === 0 && !allUserInfo.photo ? <CustomBottomSheet screenFirstPercentage="30%" screenSecondPercentage="34%" /> : <></>}

        </>
    );
};

export default Home;
