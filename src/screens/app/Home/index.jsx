import React from 'react';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
// import ImageSlider from '../../../components/ImageSlider';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Carousel from '../../../components/Carousel';

const Home = () => {
    const width = Dimensions.get('window').width;
    return (
        <View className="flex-1 bg-gray-300 space-y-5 w-full" edges={['top']}>
            <View className="bg-white mt-3 mx-3 h-fit rounded-2xl flex items-center " style={{ alignSelf: 'stretch' }}>
                <View className="flex-row justify-around my-4 w-full items-center mx-5">
                    <View className="space-y-1">
                        <Text style={{ fontSize: hp(4.5) }} className="font-semibold tracking-wider text-neutral-700">
                            Welcome
                        </Text>
                        <Text style={{ fontSize: hp(4.5) }} className="font-semibold tracking-wider text-rose-700">
                            Kaumil Patel
                        </Text>
                    </View>
                    <View className="flex justify-center items-center space-y-2">
                        <Image source={{ uri: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600" }} style={{ height: hp(10), width: hp(10) }} className="rounded-full" />
                    </View>
                </View>
            </View>
            <ScrollView>
                <Carousel />
                <View className="h-full">
                    <Text className="mt-5 font-bold">

                    </Text>
                </View>

            </ScrollView>

            {/* <SafeAreaView>
            <View>
                <View className="flex flex-row p-4 justify-between">
                    <View className="flex-col">
                        <Text className="font-normal text-black-[#464646]">Welcome Home</Text>
                        <Text className="font-semibold font-serif text-2xl text-black">Kaumil Patel</Text>
                    </View>
                    <View className="overflow-hidden h-16 w-16" >
                        <Image source={{ uri: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600" }} className="h-full w-full rounded-full" resizeMethod='resize' resizeMode='cover' />
                    </View>
                </View>
            </View>
            <ImageSlider />
        </SafeAreaView> */}

        </View>
    )
}

export default Home