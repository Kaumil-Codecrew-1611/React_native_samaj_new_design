import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../../components/Button';
import { SCREEN_HEIGHT } from '../../../constants/Screen';
import ApiContext from '../../../context/ApiContext';
import { COLORS } from '../../../utils/colors';
import { GlobalContext } from '../../../context/globalState';
import { withTiming } from 'react-native-reanimated';

const Welcome = ({ navigation }) => {
    const { joinPageContent } = useContext(ApiContext);
    const [imageOfJoinPage, setImageOfJoinPage] = useState("");
    const [contentTitle, setContentTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const { progress } = useContext(GlobalContext);
    useEffect(() => {
        (async function () {
            const contentJoinPage = await joinPageContent();
            setContentTitle(contentJoinPage.title);
            setDescription(contentJoinPage.description);
            setImageOfJoinPage(contentJoinPage.image);
            setLoading(false);
        })();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <ActivityIndicator size="large" color="black" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <LinearGradient
                colors={[COLORS.secondary, COLORS.primary]}
                className="h-full flex"
            >
                {/* <View className="flex items-center w-full" style={{ height: SCREEN_HEIGHT / 2 }}> */}
                <View className="flex-1 items-center w-full">
                    <Image
                        source={{ uri: `${process.env.IMAGE_URL}${imageOfJoinPage}` }}
                        className="rounded-bl-3xl rounded-br-3xl w-full h-full"
                    />
                </View>
                <View className="h-1/2">
                    <View className="flex items-center pt-5">
                        <View className="px-3">
                            <Text className="text-2xl text-white font-extrabold mt-3">{contentTitle}</Text>
                            <Text className="text-sm text-white mt-3">{description}</Text>
                        </View>
                    </View>

                    <View className="mt-4 w-full px-4">
                        <Button
                            title="Join Now"
                            className="rounded-2xl bg-lime-600 p-3"
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
                        <View className="flex flex-row items-center justify-center">
                            <Text className="text-base text-white ">Go to</Text>
                            <Pressable onPress={() => { progress.value = withTiming("1"); navigation.navigate("Home") }}>
                                <Text className="text-base text-white font-semibold ml-2">Home Page</Text>
                            </Pressable>
                        </View>
                    </View>

                </View>
            </LinearGradient>
        </ScrollView>
    );
};

export default Welcome;
