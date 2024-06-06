import React, { useContext, useEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { withTiming } from 'react-native-reanimated';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CardDetails from '../../../components/CardDetails';
import Carousel from '../../../components/Carousel';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';
const Home = ({ navigation }) => {
    const { progress, allUserInfo } = useContext(GlobalContext)
    const { homePageAllSlider, contactUsPageDetails } = useContext(ApiContext);
    const [firstName, setFirstName] = useState(allUserInfo?.firstname ? allUserInfo?.firstname : "Panchal")
    const [lastName, setLastName] = useState(allUserInfo?.lastname ? allUserInfo?.lastname : "Samaj")
    const [profileImage, setProfileImage] = useState(`${process.env.IMAGE_URL}${allUserInfo?.photo}`)
    const [sliderImages, setSliderImages] = useState([])

    const cards = [
        { id: 1, name: "About us", redirectTo: "Aboutus", image: require('../../../assets/aboutus.png'), thumbnail: "" },
        { id: 3, name: "Villages", redirectTo: "VillageListing", image: require('../../../assets/villageImg.png'), thumbnail: "" },
        { id: 4, name: "News", redirectTo: "News", image: require('../../../assets/NewsImg.png'), thumbnail: "" },

        { id: 5, name: "", redirectTo: "", image: "", thumbnail: "" },
    ]
    useEffect(() => {
        (async function () {
            setFirstName(allUserInfo?.firstname)
            setLastName(allUserInfo?.lastname)
            setProfileImage(`${process.env.IMAGE_URL}${allUserInfo?.photo}`)
            const result = await homePageAllSlider()
            setSliderImages(result)

        })()
    }, [allUserInfo])

    useEffect(() => {
        (async function () {
            const contentContactUs = await contactUsPageDetails();
            console.log("contentContactUscontentContactUscontentContactUs", contentContactUs)
        })()
    }, [])

    const renderItem = ({ item }) => {
        return (
            <View className="flex-1 flex-row justify-around">
                <CardDetails
                    content={item.name}
                    redirectTo={item.redirectTo}
                    navigation={navigation}
                    thumbnail={item.thumbnail}
                    size="lg"
                    image={item.image}
                    idx={item.id}
                />
            </View>
        );
    };
    function profileNavigate() {
        progress.value = withTiming("3");
        navigation.navigate("Profile")
    }
    return (
        <View className="flex-1 bg-gray-300 space-y-5 w-full pb-20" edges={['top']}>
            <Pressable onPress={profileNavigate} className="bg-white mt-3 mx-1 h-fit rounded-2xl flex items-center" style={{ alignSelf: 'stretch' }}>
                <View className="flex-row justify-around my-4 w-full items-center mx-1">
                    <View className="space-y-1 basis-2/3 justify-center px-5">
                        <Text style={{ fontSize: hp(4.5) }} className="font-semibold tracking-wider text-neutral-700">
                            Welcome
                        </Text>
                        <Text style={{ fontSize: hp(3.5) }} className="font-semibold tracking-wider text-rose-700">

                            {!firstName ? "Panchal Samaj" : `${firstName} ${lastName}`}
                        </Text>
                    </View>
                    <View className="flex justify-center items-center space-y-2 basis-1/3 cursor-pointer">
                        <Image source={{ uri: profileImage }} style={{ height: hp(10), width: hp(10) }} className="rounded-full" />
                    </View>
                </View>
            </Pressable>
            <FlatList
                data={cards}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                key={2}
                horizontal={false}
                contentContainerStyle={{ display: 'flex', gap: 2, width: '100%', paddingHorizontal: 3 }}
                ListHeaderComponent={<Carousel sliderImages={sliderImages} />}
            />
        </View>
    )
}

export default Home