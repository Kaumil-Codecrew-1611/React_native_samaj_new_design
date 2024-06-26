import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ApiContext from '../../context/ApiContext';

const useTruncateText = (text, wordLimit) => {
    return text.split(' ').slice(0, wordLimit).join(' ') + (text.split(' ').length > wordLimit ? '...' : '');
};

const NewsHomePageContent = ({ navigation }) => {

    const { t } = useTranslation();
    const { newsListing } = useContext(ApiContext);
    const [topNewsListing, setTopNewsListing] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function () {
            const newsListingContent = await newsListing();
            setTopNewsListing(newsListingContent);
            setLoading(false);
        })();
    }, []);

    const handleNewsOpen = (id) => {
        navigation.navigate('NewsDetailsPage', { newsId: id });
    }

    const renderSkeleton = () => (
        <View>
            {[1, 2, 3].map((_, index) => (
                <View key={index} style={{ flexDirection: 'row', width: '100%', padding: 15, backgroundColor: '#ffffff', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginTop: 10 }}>
                    <View style={{ width: '40%', borderRadius: 10, marginRight: 10 }}>
                        <View style={{ height: hp('18%'), width: '100%', backgroundColor: '#f0f0f0', borderRadius: 10 }} />
                    </View>
                    <View className="flex-1">
                        <View className="w-[70%] h-5 bg-gray-100 mb-2 rounded-md" />
                        <View className="w-[70%] h-5 bg-gray-100 mb-2 rounded-md" />
                        <View className="w-[70%] h-5 bg-gray-100 mb-2 rounded-md" />
                    </View>
                </View>
            ))}
        </View>
    );

    return (
        <>
            <View className="p-3">
                <View>
                    <Text className="text-2xl font-semibold tracking-wider text-rose-700 border-b-2 border-red-700 my-2 w-[40%]">
                        {t("LatestNews")}
                    </Text>
                </View>
                {loading ? (
                    renderSkeleton()
                ) : (
                    topNewsListing.slice(0, 3).map((item, index) => {
                        const truncatedTitle = useTruncateText(item.title, 7);
                        const truncatedDescription = useTruncateText(item.description, 12);
                        return (
                            <TouchableOpacity key={index} onPress={() => handleNewsOpen(item._id)}>
                                <View className="flex flex-row items-center w-full p-3 bg-white rounded-lg shadow-md mt-2">
                                    <View className="w-[40%] rounded-lg mr-2">
                                        <Image source={{ uri: process.env.IMAGE_URL + item.image }} resizeMode='cover' style={{ height: hp('15%'), width: '100%', borderRadius: 10 }} />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-[18px] font-bold">{truncatedTitle}</Text>
                                        <Text className="capitalize text-[15px] font-semibold text-justify mt-3">{truncatedDescription}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                )}
            </View>
        </>
    );
};

export default NewsHomePageContent;