import { ScrollView } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import RenderHTML from 'react-native-render-html';
import ApiContext from '../../../context/ApiContext';

const NewsDetailsPage = ({ route }) => {

    const { t } = useTranslation();
    const { newsId } = route.params;
    const { newsDataById } = useContext(ApiContext);
    const [isVisible, setIsVisible] = useState(false);
    const [newsDetailsTitle, setNewsDetailsTitle] = useState("");
    const [newsDetailsImage, setNewsDetailsImage] = useState("");
    const [newsDetailsDescription, setNewsDetailsDescription] = useState("");
    const [newsDetailsCreateDate, setNewsDetailsCreateDate] = useState("");
    const [newsAddPerson, setNewsAddPerson] = useState("");
    const { width } = Dimensions.get('window');
    const images = [
        {
            uri: `${process.env.IMAGE_URL}${newsDetailsImage}`,
        },
    ];

    const openModal = () => {
        setIsVisible(true);
    };

    const closeModal = () => {
        setIsVisible(false);
    };

    const formatDate = (timestamp) => {
        if (!timestamp) {
            return 'Invalid date';
        }
        const date = new Date(Number(timestamp));
        if (isNaN(date)) {
            return 'Invalid date';
        }
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        (async function () {
            try {
                const contentNewsDetails = await newsDataById(newsId);
                setNewsDetailsTitle(contentNewsDetails.title)
                setNewsDetailsDescription(contentNewsDetails.description)
                setNewsDetailsCreateDate(contentNewsDetails.created_at)
                setNewsDetailsImage(contentNewsDetails.image)
                setNewsAddPerson(contentNewsDetails.createdBy)
            } catch (error) {
                console.log("error", error)
            }
        })();
    }, [newsId]);

    return (
        <>
            <View className="bg-gray-300 flex flex-1 flex-row p-2">
                <View>
                    <View className="w-[100%] bg-white p-2 rounded-2xl">
                        <View className="flex-row justify-between items-center flex-wrap">
                            <View>
                                <Text className="font-bold text-xl text-justify my-3 text-black">{newsDetailsTitle}</Text>
                            </View>
                            <View>
                                <Text className="text-sm text-black font-bold mb-2">{formatDate(newsDetailsCreateDate)}</Text>
                            </View>
                        </View>
                        <View className="relative" style={styles.shadow}>
                            <TouchableOpacity onPress={openModal}>
                                <Image
                                    source={{ uri: `${process.env.IMAGE_URL}${newsDetailsImage}` }}
                                    className="h-[180px] w-[100%] rounded-3xl"
                                />
                            </TouchableOpacity>
                            {newsAddPerson && <View className="rounded-bl-[20px] bg-white absolute bottom-0 px-3">
                                <View className="flex flex-row items-center gap-2">
                                    <Text className="font-bold text-black text-base">
                                        Create By
                                    </Text>
                                    <Text className="text-base text-black font-medium">
                                        {newsAddPerson}
                                    </Text>
                                </View>
                            </View>}
                        </View>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View className="bg-white rounded-2xl mt-2 p-2" style={styles.shadow}>
                            <View>
                                <Text className="text-black text-2xl font-bold">{t("Description")}</Text>
                            </View>
                            <View className="text-justify mb-5 text-black">
                                <RenderHTML
                                    contentWidth={width}
                                    source={{ html: newsDetailsDescription }}
                                    tagsStyles={{ body: { color: 'black' } }}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <ImageViewing
                    images={images}
                    imageIndex={0}
                    visible={isVisible}
                    onRequestClose={closeModal}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 5,
        elevation: 10,
    },
});

export default NewsDetailsPage;