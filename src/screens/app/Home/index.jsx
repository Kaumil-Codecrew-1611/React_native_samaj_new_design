import React, { useEffect } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import ImageSlider from '../../../components/ImageSlider';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Carousel from '../../../components/Carousel';
import CardDetails from '../../../components/CardDetails';
import { FlatList } from 'react-native-gesture-handler';

const Home = ({ navigation }) => {
    const cards = [
        { id: 1, name: "About us", redirectTo: "Aboutus", thumbnail: "" },
        { id: 2, name: "Directory", redirectTo: "Directory", thumbnail: "" },
        { id: 3, name: "Villages", redirectTo: "Villages", thumbnail: "" },
        { id: 4, name: "Search", redirectTo: "Search", thumbnail: "" },
        { id: 5, name: "News", redirectTo: "News", thumbnail: "" },
        { id: 6, name: "", redirectTo: "", thumbnail: "" },
    ]
    const renderItem = ({ item }) => {
        return (
            <View className="flex-1 flex-row justify-center">
                <CardDetails
                    content={item.name}
                    redirectTo={item.redirectTo}
                    navigation={navigation}
                    thumbnail={item.thumbnail}
                    size="sm"
                    idx={item.id}
                />

            </View>
        );
    };
    const width = Dimensions.get('window').width;
    return (
        <View className="flex-1 bg-gray-300 space-y-5 w-full pb-20" edges={['top']}>
            <View className="bg-white mt-3 mx-1 h-fit rounded-2xl flex items-center" style={{ alignSelf: 'stretch' }}>
                <View className="flex-row justify-around my-4 w-full items-center mx-1">
                    <View className="space-y-1 basis-2/3 justify-center px-5">
                        <Text style={{ fontSize: hp(4.5) }} className="font-semibold tracking-wider text-neutral-700">
                            Welcome
                        </Text>
                        <Text style={{ fontSize: hp(4.5) }} className="font-semibold tracking-wider text-rose-700">
                            Kaumil Patel
                        </Text>
                    </View>
                    <View className="flex justify-center items-center space-y-2 basis-1/3">
                        <Image source={{ uri: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600" }} style={{ height: hp(10), width: hp(10) }} className="rounded-full" />
                    </View>
                </View>
            </View>
            <FlatList
                data={cards}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={3}
                key={3}
                horizontal={false}
                contentContainerStyle={{ display: 'flex', gap: 2, width: '100%', paddingHorizontal: 3 }}
                ListHeaderComponent={<Carousel />}
            />
        </View>
    )
}

export default Home