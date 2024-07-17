import { Radio } from 'native-base';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Animated, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImageView from "react-native-image-viewing";
import ApiContext from '../../../context/ApiContext';

const SelectBusinessTemplate = ({ navigation, route }) => {

    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const editSelectedTemplateNumber = route.params.templateNumber
    console.log("routerouterouteroute", editSelectedTemplateNumber)
    const [value, setValue] = useState('');
    const animation = useMemo(() => new Animated.Value(0), []);
    const { getAllBussinessTemplateListing } = useContext(ApiContext);
    const [templateListing, setTemplateListing] = useState([]);
    const [images, setImages] = useState([]);
    const [visible, setIsVisible] = useState(false);

    useEffect(() => {
        fetchAllBusinessTemplate();
        setValue(editSelectedTemplateNumber)
    }, [editSelectedTemplateNumber]);

    const fetchAllBusinessTemplate = async () => {
        try {
            const allBusinessTemplate = await getAllBussinessTemplateListing();
            const formattedTemplates = allBusinessTemplate.templates.map(template => ({
                ...template,
                images: [
                    { uri: process.env.IMAGE_URL + template.image.front },
                    { uri: process.env.IMAGE_URL + template.image.back },
                ],
            }));
            setTemplateListing(formattedTemplates);
        } catch (error) {
            console.log("Error fetching all business template:", error);
        }
    };

    const handlePress = useCallback((templateId) => {
        setValue(templateId);
    }, []);

    const onPressIn = useCallback(() => {
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }, [animation]);

    const onPressOut = useCallback(() => {
        Animated.spring(animation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    }, [animation]);

    const renderItem = ({ item }) => {

        const animationForTemplate = new Animated.Value(0);
        const template_scale = animationForTemplate.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.1]
        });

        const onPresstemplateIn = () => {
            Animated.spring(animationForTemplate, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        };

        const onPresstemplateOut = () => {
            Animated.spring(animationForTemplate, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        };

        const onGetImages = (image) => {
            setImages(image);
            setIsVisible(true);
        };

        return (
            <View style={{ width: '100%', marginTop: "10px" }}>
                <Pressable
                    onPress={() => handlePress(item.id)}
                    onPressIn={onPresstemplateIn}
                    onPressOut={onPresstemplateOut}
                    style={[
                        styles.planCard,
                        value === item.id && styles.selectedTemplate,
                        item === templateListing[0] && styles.recommendedTemplate
                    ]}
                >
                    <Radio.Group
                        name="subscriptionPlan"
                        value={value}
                        onChange={handlePress}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <View>
                                <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold' }}>
                                    {item.name}
                                </Text>
                                <Animated.View style={{ transform: [{ scale: template_scale }], justifyContent: 'center', paddingTop: 10, paddingBottom: 3 }}>
                                    <TouchableOpacity
                                        onPress={() => onGetImages(item.images)}
                                    >
                                        <Text style={{ fontSize: 14, color: 'blue' }}>Preview Template</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>
                            <View>
                                <Radio value={item.id} my={1} />
                            </View>
                        </View>
                    </Radio.Group>
                </Pressable>
            </View>
        );
    };

    const scale = animation.interpolate({ inputRange, outputRange });

    const onMoveToAddBusinessForm = () => {
        navigation.navigate('AddBusinessDetailsScreen', { templateId: value });
    }

    return (
        <>
            <View className="bg-[#E9EDF7] h-full">

                <View className="bg-white rounded-lg m-2 p-3 mb-4">
                    <Text className="text-black text-xl font-bold">Choose Your Business Template</Text>
                </View>

                <FlatList
                    data={templateListing}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.flatlistContainer}
                />

                <View className="relative">
                    <View className="absolute bottom-0 p-2 bg-white rounded flex flex-row justify-between items-center w-full">
                        <View className="w-full">
                            <Animated.View style={[{ transform: [{ scale }] }]} className="flex items-end">
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPressIn={onPressIn}
                                    onPressOut={onPressOut}
                                    onPress={onMoveToAddBusinessForm}
                                    disabled={!value}
                                    style={[
                                        styles.subscribeButton,
                                        (!value) && styles.disabledButton
                                    ]}
                                >
                                    <Text className="text-white text-lg font-bold">Next</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>

                    </View>
                </View>
            </View>

            <ImageView
                images={images}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />
        </>
    );
};

const styles = StyleSheet.create({
    flatlistContainer: {
        marginTop: 2,
        padding: 1,
    },
    subscribeButton: {
        backgroundColor: '#4E63AC',
        padding: 10,
        width: 180,
        borderRadius: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    disabledButton: {
        opacity: 0.5,
    },
    planCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        marginHorizontal: 15,
        marginBottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    selectedTemplate: {
        marginTop: 10,
        borderColor: 'blue',
        borderWidth: 2,
        transform: [{ scale: 1.05 }],
    },
    recommendedTemplate: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
});

export default SelectBusinessTemplate;