import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

const HomePageCardContents = ({ content, size, image, redirectTo, functionality, navigation, handleSetSelectedVillage, villageListing }) => {

    const route = useRoute();
    const redirect = () => {
        if (villageListing) {
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

    return (
        <>
            {content && (
                <View className="bg-white p-3 rounded-2xl mt-5">
                    <TouchableOpacity
                        onPress={redirect}
                        activeOpacity={0.85}
                    >
                        <View>
                            <Image className="w-24 h-24" source={image} />
                        </View>
                        <Text className="text-lg font-semibold text-center">
                            {content}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
};


export default HomePageCardContents;