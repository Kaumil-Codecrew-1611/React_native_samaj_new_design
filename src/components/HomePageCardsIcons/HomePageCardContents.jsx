import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

const HomePageCardContents = ({ content, image, redirectTo, functionality, navigation, handleSetSelectedVillage, villageListing }) => {

    const route = useRoute();
    const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

    const redirect = () => {
        if (villageListing) {
            handleSetSelectedVillage(content);
        }
        if (redirectTo) {
            navigation.navigate(redirectTo);
        } else {
            if (route.name === "Home") {
                functionality();
            }
        }
    };

    return (
        <>
            {content && (
                <View style={[styles.container, windowWidth < 361 && styles.smallContainer]}>
                    <TouchableOpacity
                        onPress={redirect}
                        activeOpacity={0.85}
                    >
                        <View>
                            <Image
                                className={`${windowWidth < 361 ? "w-16" : "w-24"} ${windowWidth < 361 ? "h-16" : "h-24"} text-black font-semibold text-center`}
                                source={image}
                            />
                        </View>
                        <Text className={`${windowWidth < 361 ? "text-xl" : "text-2xl"} text-black font-semibold text-center`}>
                            {content}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 20,
        marginTop: 5,
        alignItems: 'center',
    },
    smallContainer: {
        width: 100,
    },
});

export default HomePageCardContents;
