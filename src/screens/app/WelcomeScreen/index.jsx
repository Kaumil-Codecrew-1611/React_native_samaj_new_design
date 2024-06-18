import React, { useContext, useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../../components/Button';
import { SCREEN_HEIGHT } from '../../../constants/Screen';
import ApiContext from '../../../context/ApiContext';
import { COLORS } from '../../../utils/colors';

const Welcome = ({ navigation }) => {

    const { joinPageContent } = useContext(ApiContext);
    const [imageOfJoinPage, setImageOfJoinPage] = useState("")
    const [contentTitle, setContentTitle] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        (async function () {
            const contentJoinPage = await joinPageContent();
            setContentTitle(contentJoinPage.title)
            setDescription(contentJoinPage.description)
            setImageOfJoinPage(contentJoinPage.image)
        })();
    }, []);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <LinearGradient
                colors={[COLORS.secondary, COLORS.primary]}
                className="h-full"
            >
                <View className="flex items-center w-full" style={{ height: SCREEN_HEIGHT / 2 }}>
                    <Image
                        source={{ uri: `${process.env.IMAGE_URL}${imageOfJoinPage}` }}
                        className="rounded-bl-3xl rounded-br-3xl w-full h-full"
                    />
                </View>
                <View className="relative h-1/2">
                    <View className="flex items-center pt-5">
                        <View className="px-3">
                            <Text className="text-2xl text-white font-extrabold mt-3">{contentTitle}</Text>
                            <Text className="text-lg text-white mt-3">{description}</Text>
                        </View>
                    </View>
                    <View className="absolute bottom-3 w-full px-4">
                        <Button
                            title="Join Now"
                            className="rounded-2xl bg-lime-600"
                            onPress={() => navigation.navigate("Register")}
                        />
                        <View className="flex flex-row justify-center items-center my-3">
                            <Text className="text-base text-white">Already have an account?</Text>
                            <Pressable
                                onPress={() => navigation.navigate("Login")}
                            >
                                <Text className="text-base font-bold ml-1 text-white">Login</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View className="relative h-1/2">
                    <View className="flex items-center pt-5">
                        <Text className="text-3xl text-white font-extrabold">{contentTitle}</Text>
                        <View className="my-5 px-3">
                            <Text className="text-lg text-white">{description}</Text>
                        </View>
                    </View>
                    <View className="absolute bottom-3 w-full px-4">
                        <Button
                            title="Join Now"
                            className="rounded-2xl bg-lime-600"
                            onPress={() => navigation.navigate("Register")}
                        />
                        <View className="flex flex-row justify-center items-center my-3">
                            <Text className="text-base text-white">Already have an account?</Text>
                            <Pressable
                                onPress={() => navigation.navigate("Login")}
                            >
                                <Text className="text-base font-bold ml-1 text-white">Login</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </ScrollView>
    );
};

export default Welcome;
