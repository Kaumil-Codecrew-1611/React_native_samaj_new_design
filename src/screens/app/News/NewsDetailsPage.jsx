import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import RenderHTML from 'react-native-render-html';
import ApiContext from '../../../context/ApiContext';
import { ScrollView } from 'native-base';
import { useTranslation } from 'react-i18next';

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
        <View className="bg-gray-300" style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View>
                    <Text style={styles.title}>{t('newsDetails')}</Text>
                </View>
                <View>
                    <View>
                        <View style={styles.imageContainer}>
                            <View className="relative">
                                <TouchableOpacity onPress={openModal}>
                                    <Image
                                        source={{ uri: `${process.env.IMAGE_URL}${newsDetailsImage}` }}
                                        style={styles.image}
                                    />
                                </TouchableOpacity>
                                {newsAddPerson && <View className="rounded-bl-[20px] bg-white absolute bottom-0 px-3">
                                    <View className="flex flex-row items-center gap-2">
                                        <Text className="font-bold text-base">
                                            Create By
                                        </Text>
                                        <Text className="text-base font-medium">
                                            {newsAddPerson}
                                        </Text>
                                    </View>
                                </View>}
                            </View>

                            <View style={styles.textContainer}>
                                <View>
                                    <Text style={styles.author}>{newsDetailsTitle}</Text>
                                </View>
                                <View>
                                    <Text style={styles.date}>{formatDate(newsDetailsCreateDate)}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.descriptionContainer}>
                            <RenderHTML
                                contentWidth={width}
                                source={{ html: newsDetailsDescription }}
                                tagsStyles={htmlStyles}
                            />
                        </View>
                    </View>
                </View>
                <ImageViewing
                    images={images}
                    imageIndex={0}
                    visible={isVisible}
                    onRequestClose={closeModal}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#4a4a4a',
        marginTop: 7,
        marginBottom: 15
    },
    imageContainer: {
        width: '100%',
    },
    image: {
        height: 180,
        width: '100%',
        borderRadius: 20,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    author: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'justify',
        marginVertical: 12,
    },
    date: {
        fontSize: 13,
        color: '#4a4a4a',
        fontWeight: 'bold',
    },
    descriptionContainer: {
        marginTop: 12,
        marginBottom: 20,
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

export default NewsDetailsPage;
