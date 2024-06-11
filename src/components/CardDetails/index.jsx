import {
    BackdropBlur,
    Canvas,
    Fill,
    Image,
    useImage
} from "@shopify/react-native-skia";
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { GlobalContext } from "../../context/globalState";
import { useRoute } from '@react-navigation/native';
const CardDetails = ({ content, size, image, redirectTo, functionality, navigation, handleSetSelectedVillage, villageListing }) => {
    const route = useRoute();

    const small = (size === 'sm');
    const large = (size === 'lg');
    const full = (size === 'full');

    const [loading, setLoading] = useState(true);
    const imageURL = useImage(image);

    useEffect(() => {
        if (imageURL) {
            setLoading(false);
        }
    }, [imageURL]);

    const redirect = () => {
        console.log(route.name == "Home", "route.name")
        if (villageListing) {
            console.log(content, ":::::::::content")
            handleSetSelectedVillage(content);
        }
        if (redirectTo) {
            navigation.navigate(redirectTo);
        } else {
            if (route.name == "Home") {
                functionality();
            }
        }
    };

    const canvasWidth = small ? 256 : large ? 300 : full ? 330 : 156;
    const canvasHeight = small ? 150 : large ? 230 : full ? 500 : 180;
    const imageWidth = small ? 112 : large ? 160 : full ? 330 : 130;
    const imageHeight = small ? 170 : large ? 250 : full ? 500 : 190;
    const blurClipY = small ? 90 : large ? 180 : full ? 380 : 120;
    const blurClipWidth = full ? 350 : 256;

    return (
        <>
            {content && (
                <TouchableOpacity
                    onPress={redirect}
                    activeOpacity={0.85}
                    className={`${small ? "w-28" : large ? "w-40" : full ? "w-full" : "w-32"} overflow-hidden rounded-2xl shadow-lg shadow-black m-2 mb-5`}
                >
                    <View className="relative">
                        {loading ? (
                            <SkeletonPlaceholder>
                                <SkeletonPlaceholder.Item
                                    width={canvasWidth}
                                    height={canvasHeight}
                                    borderRadius={10}
                                />
                            </SkeletonPlaceholder>
                        ) : (
                            <Canvas style={{ width: canvasWidth, height: canvasHeight }}>
                                <Image
                                    image={imageURL}
                                    x={0}
                                    y={0}
                                    width={imageWidth}
                                    height={imageHeight}
                                    fit="cover"
                                />
                                <BackdropBlur
                                    blur={4}
                                    clip={{ x: 0, y: blurClipY, width: blurClipWidth, height: 120 }}
                                >
                                    <Fill color="rgba(200, 200, 200, 0.2)" />
                                </BackdropBlur>
                            </Canvas>
                        )}
                        <View className="bottom-0 p-2 absolute w-full">
                            <Text className={`${small ? 'h-12 text-xl text-center' : large ? 'h-10 text-2xl' : full ? 'h-24 text-4xl' : 'h-12 text-2xl'} font-bold text-gray-200`}>
                                {content}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    stretch: {
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        height: 200,
    },
});

export default CardDetails;
