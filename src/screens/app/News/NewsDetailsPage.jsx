import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageViewing from 'react-native-image-viewing';
import RenderHTML from 'react-native-render-html';
import ApiContext from '../../../context/ApiContext';

const NewsDetailsPage = ({ route }) => {
    const { newsId } = route.params;
    const { newsDataById } = useContext(ApiContext);
    const [isVisible, setIsVisible] = useState(false);
    const [newsDetailsTitle, setNewsDetailsTitle] = useState("");
    const [newsDetailsImage, setNewsDetailsImage] = useState("");
    const [newsDetailsDescription, setNewsDetailsDescription] = useState("");
    const [newsDetailsCreateDate, setNewsDetailsCreateDate] = useState("");

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
            } catch (error) {
                console.log("error", error)
            }
        })();
    }, [newsId]);

    const selectImage = async () => {
        try {
            const image = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
            });
            setNewsDetailsImage(image.path);
        } catch (error) {
            console.error('ImagePicker Error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>News Details</Text>
            </View>
            <View>
                <View>
                    <View style={styles.imageContainer}>
                        <TouchableOpacity onPress={openModal}>
                            <Image
                                source={{ uri: `${process.env.IMAGE_URL}${newsDetailsImage}` }}
                                style={styles.image}
                            />
                        </TouchableOpacity>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
