import React, { useRef, useEffect, useState } from 'react';
import { Image, Text, View, FlatList, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
const PAGE_WIDTH = Dimensions.get('window').width;
const NewsHomePageContent = ({ sliderImages }) => {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const data = [
        {
            id: 1,
            image: `${process.env.IMAGE_URL}${sliderImages[1] && sliderImages[1]?.image}`,
            title: "Sample Title 1",
            description: "Sample description for item 1",
        },
        {
            id: 2,
            image: `${process.env.IMAGE_URL}${sliderImages[2] && sliderImages[2]?.image}`,
            title: "Sample Title 2",
            description: "Sample description for item 2",
        },
        {
            id: 3,
            image: `${process.env.IMAGE_URL}${sliderImages[2] && sliderImages[2]?.image}`,
            title: "Sample Title 3",
            description: "Sample description for item 3",
        },
    ];
    const infiniteData = useRef([...data, ...data, ...data]);
    const [autoPlay] = useState(true);
    const [snapEnabled] = useState(true);
    useEffect(() => {
        const interval = setInterval(() => {
            if (flatListRef.current) {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % infiniteData.current.length);
                flatListRef.current.scrollToIndex({
                    animated: true,
                    index: currentIndex,
                });
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const renderItem = ({ item, index }) => (
        <>
            <View className="flex flex-1 justify-center items-center">
                <View key={index} style={{ marginTop: 15 }}>
                    <View style={{ backgroundColor: '#ddd', borderRadius: 10, overflow: 'hidden', width: 360 }}>
                        <Image source={{ uri: item.image }} resizeMode='stretch' style={{ height: hp('30%'), width: '100%', borderRadius: 10 }} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                        <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>{item.description}</Text>
                    </View>
                </View>
            </View>
        </>
    );

    return (
        <Carousel
            style={{ alignSelf: 'stretch', display: "flex", gap: 8, marginTop: 15 }}
            width={PAGE_WIDTH}
            height={PAGE_WIDTH * 0.8}
            vertical={false}
            loop
            snapEnabled={snapEnabled}
            autoPlay={autoPlay}
            autoPlayInterval={1500}
            modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 50,
            }}
            data={data}
            scrollAnimationDuration={1000}
            renderItem={renderItem} />
        // <FlatList
        //     ref={flatListRef}
        //     data={infiniteData.current}
        //     horizontal
        //     showsHorizontalScrollIndicator={false}
        //     contentContainerStyle={{ paddingHorizontal: 10 }}
        //     keyExtractor={(item, index) => `${item.id}-${index}`}
        //     renderItem={renderItem}
        //     initialScrollIndex={data.length}
        //     getItemLayout={(data, index) => (
        //         { length: 320, offset: 320 * index, index }
        //     )}
        //     pagingEnabled
        // />
    );
};

export default NewsHomePageContent;
