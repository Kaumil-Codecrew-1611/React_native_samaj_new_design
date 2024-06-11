import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import RenderHTML from 'react-native-render-html';
import ApiContext from '../../../context/ApiContext';
import { ScrollView } from 'native-base';
import { useTranslation } from 'react-i18next';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';

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
    const [loading, setLoading] = useState(true);
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
                setNewsDetailsTitle(contentNewsDetails.title);
                setNewsDetailsDescription(contentNewsDetails.description);
                setNewsDetailsCreateDate(contentNewsDetails.created_at);
                setNewsDetailsImage(contentNewsDetails.image);
                setNewsAddPerson(contentNewsDetails.createdBy);
                setLoading(false);
            } catch (error) {
                console.log("error", error);
            }
        })();
    }, [newsId]);

    // Animation setup
    const scrollRef = useAnimatedRef();
    const scrolloffset = useScrollViewOffset(scrollRef);

    const IMG_HEIGHT = 180; // Adjust to your image height

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrolloffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
                    ),
                },
                {
                    scale: interpolate(
                        scrolloffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [2, 1, 1]
                    )
                }
            ]
        };
    });

    return (
        <View className="bg-gray-300" style={styles.container}>
            <ScrollView
                ref={scrollRef}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {loading ? (
                    <SkeletonPlaceholder>
                        <View style={styles.skeletonContainer}>
                            <View style={styles.skeletonImage} />
                            <View style={styles.skeletonTextLarge} />
                            <View style={styles.skeletonTextMedium} />
                            <View style={styles.skeletonTextSmall} />
                        </View>
                    </SkeletonPlaceholder>
                ) : (
                    <View>
                        <View>
                            <Animated.View style={imageAnimatedStyle} className="relative">
                                <View>
                                    <Text className="font-bold text-2xl text-black mt-2 mb-4">{t('newsDetails')}</Text>
                                </View>
                                <TouchableOpacity onPress={openModal}>
                                    <Image
                                        source={{ uri: `${process.env.IMAGE_URL}${newsDetailsImage}` }}
                                        style={styles.image}
                                        className="rounded-[20px]"
                                    />
                                </TouchableOpacity>
                                {newsAddPerson &&
                                    <View className="rounded-bl-[20px] bg-white absolute bottom-0 px-3">
                                        <View className="flex flex-row items-center gap-2">
                                            <Text className="font-bold text-base text-black">
                                                {t('createdBy')}
                                            </Text>
                                            <Text className="text-base font-medium text-black">
                                                {newsAddPerson}
                                            </Text>
                                        </View>
                                    </View>
                                }
                            </Animated.View>
                            <View className="bg-gray-300">
                                <View className="flex flex-1 flex-row justify-between items-center flex-wrap">
                                    <View>
                                        <Text className="font-bold text-xl text-justify my-3 text-black">{newsDetailsTitle}</Text>
                                    </View>
                                    <View>
                                        <Text className="text-sm text-black font-bold">{formatDate(newsDetailsCreateDate)}</Text>
                                    </View>
                                </View>
                                <View className="mt-3 mb-5">
                                    <RenderHTML
                                        contentWidth={width}
                                        source={{ html: newsDetailsDescription }}
                                        tagsStyles={{ body: { color: 'black', textAlign: "justify" } }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                )}
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
    image: {
        width: '100%',
        height: 180, // Same as IMG_HEIGHT
    },
    skeletonContainer: {
        padding: 10,
    },
    skeletonImage: {
        width: '100%',
        height: 180,
        borderRadius: 20,
        marginBottom: 10,
    },
    skeletonTextLarge: {
        width: '80%',
        height: 20,
        borderRadius: 4,
        marginBottom: 10,
    },
    skeletonTextMedium: {
        width: '60%',
        height: 20,
        borderRadius: 4,
        marginBottom: 10,
    },
    skeletonTextSmall: {
        width: '40%',
        height: 20,
        borderRadius: 4,
        marginBottom: 10,
    },
});

export default NewsDetailsPage;
