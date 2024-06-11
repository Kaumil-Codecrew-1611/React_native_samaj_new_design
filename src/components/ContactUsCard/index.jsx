import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ApiContext from '../../context/ApiContext';

function ContactUsCard() {
    const { t } = useTranslation();
    const { contactUsPageDetails } = useContext(ApiContext);
    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);
    const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);
    const [contact1, setContact1] = useState('');
    const [contactno1, setContactno1] = useState('');
    const [contact2, setContact2] = useState('');
    const [contactno2, setContactno2] = useState('');
    const [email, setEmail] = useState('');
    const [instagramLink, setInstagramLink] = useState('');
    const [faceBookLink, setFaceBookLink] = useState('');
    const [twitterLink, setTwitterLink] = useState('');

    useEffect(() => {
        (async function () {
            const contentContactUs = await contactUsPageDetails();
            const desiredKeys = ['contact1', 'contactno1', 'contact2', 'contactno2', 'email', "instagram", "facebook", "twitter"];
            contentContactUs.forEach((item) => {
                if (desiredKeys.includes(item.key)) {
                    switch (item.key) {
                        case 'contact1':
                            setContact1(item.value);
                            break;
                        case 'contactno1':
                            setContactno1(item.value);
                            break;
                        case 'contact2':
                            setContact2(item.value);
                            break;
                        case 'contactno2':
                            setContactno2(item.value);
                            break;
                        case 'email':
                            setEmail(item.value);
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
                        default:
                            break;
                    }
                }
            });
        })();
    }, []);

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

    return (
        <View className="mb-20">
            <View className="w-full h-64 p-4">
                <View className="w-full bg-white h-full rounded-[20px] p-5">
                    <View className="w-full h-full">
                        <View className="mb-3 w-full flex flex-row gap-3 items-center">
                            <AnimatedFontistoIcon
                                name="mobile"
                                size={25}
                                color="black"
                            />
                            <Text className="text-xl tracking-wider text-neutral-700 font-extrabold">{t('mobile')}</Text>
                        </View>
                        <View className="h-14">
                            <Text className="tracking-wider text-neutral-700 text-base">{t('contactusphoneheading')}</Text>
                        </View>
                        <View className="mb-2">
                            <View className="flex flex-row justify-between">
                                <View>
                                    <Text className="font-bold text-sm text-black">
                                        {contact1}
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => handleCallOpenLink("+91" + contactno1)}>
                                    <View>
                                        <Text className="text-[#5176df] tracking-wider text-sm font-semibold">
                                            +91 {contactno1}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="flex flex-row items-center justify-between">
                            <View>
                                <Text className="font-bold text-black text-sm">
                                    {contact2}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => handleCallOpenLink("+91" + contactno2)}>
                                <View>
                                    <Text className="text-[#5176df] tracking-wider text-sm font-semibold">
                                        +91 {contactno2}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View className="w-full h-44 p-4">
                <View className="w-full bg-white h-full rounded-[20px] p-5">
                    <View className="w-full h-full">
                        <View className="mb-3 w-full flex gap-3 flex-row items-center">
                            <AnimatedFontistoIcon
                                name="email"
                                size={25}
                                color="black"
                            />
                            <Text className="text-xl tracking-wider text-neutral-700 font-extrabold">{t('email')}</Text>
                        </View>
                        <View className="h-12">
                            <Text className="tracking-wider text-base text-neutral-700">{t('contactusemailheading')}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleClickOnMail(email)}>
                            <View>
                                <Text className="text-[#5176df] tracking-wider text-base font-semibold">{email}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View className="w-full h-56 p-4">
                <View className="w-full bg-white h-full rounded-[20px] p-5">
                    <View className="w-full h-full">
                        <View className="mb-3 w-full flex gap-3 flex-row items-center">
                            <AnimatedFeatherIcon
                                name="users"
                                size={25}
                                color="black"
                            />
                            <Text className="text-xl tracking-wider text-neutral-700 font-extrabold">{t('socials')}</Text>
                        </View>
                        <View className="mb-4 h-11">
                            <Text className="tracking-wider text-base text-neutral-700">{t('contactussocialheading')}</Text>
                        </View>
                        <View className="flex flex-row w-full justify-around">
                            <TouchableOpacity onPress={() => openLink(twitterLink)}>
                                <AnimatedFontistoIcon
                                    name="twitter"
                                    size={40}
                                    color="#1da1f2"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openLink(instagramLink)}>
                                <AnimatedFontistoIcon
                                    name="instagram"
                                    size={40}
                                    color="#f700b2"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openLink(faceBookLink)}>
                                <AnimatedFontistoIcon
                                    name="facebook"
                                    size={40}
                                    color="#0866ff"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default ContactUsCard;