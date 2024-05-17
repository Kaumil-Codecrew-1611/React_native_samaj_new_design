import React, { useRef } from 'react';
import { Animated, FlatList, View, Image, Text, StyleSheet } from 'react-native';

const cardHeight = 85;
const padding = 10;
const offset = cardHeight + padding;

const contact = [
    {
        id: 1,
        image: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
        name: "Ajay horilal varma",
        village: "Vastral"
    },
    {
        id: 2,
        image: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        name: "Ajay horilal varma",
        village: "Vastral"
    },
    {
        id: 8,
        image: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        name: "Ajay horilal varma",
        village: "Vastral"
    },
    {
        id: 3,
        image: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        name: "Ajay horilal varma",
        village: "Vastral"
    },
    {
        id: 4,
        image: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        name: "Ajay horilal varma",
        village: "Vastral"
    },
    {
        id: 5,
        image: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        name: "Ajay horilal varma",
        village: "Vastral"
    },
    {
        id: 6,
        image: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        name: "Ajay horilal varma",
        village: "Vastral"
    },
    {
        id: 7,
        image: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        name: "Ajay horilal varma",
        village: "Vastral"
    },
]



const VillageByName = ({ searchValue }) => {
    const scrollY = useRef(new Animated.Value(0)).current;

    const filteredContacts = contact.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <FlatList
            style={styles.container}
            data={filteredContacts}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                useNativeDriver: false,
            })}
            keyExtractor={item => item.toString()}
            renderItem={({ item, index }) => {
                const inputRange = [offset * index, offset * (index + 1)];
                const outputRange1 = [1, 0];
                const outputRange2 = [0, offset / 2];
                const scale = scrollY.interpolate({
                    inputRange,
                    outputRange: outputRange1,
                    extrapolate: 'clamp',
                });
                const translateY = scrollY.interpolate({
                    inputRange,
                    outputRange: outputRange2,
                    extrapolate: 'clamp',
                });
                const opacity = scale;
                // console.log(item.image)
                return (
                    <Animated.View
                        style={[styles.card, { opacity, transform: [{ translateY }, { scale }] }]}
                    >
                        <View className='basis-[25%] items-center' >
                            <Image className="w-[60px] h-[60px] rounded-[80px] object-cover" source={{ uri: item.image }} />
                        </View>
                        <View className="basis-[75%] pr-2">
                            <Text className="text-[20px] font-extrabold">{item.name}</Text>
                            <Text className="text-[15px] font-bold">{item.village}</Text>
                        </View>
                    </Animated.View>
                );
            }}
        />
    );
};

export default VillageByName;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '',
        paddingVertical: padding / 2,
        marginBottom: 10,
    },
    card: {
        display: 'flex',
        flexDirection: "row",
        marginHorizontal: 12,
        marginVertical: padding / 2,
        height: cardHeight,
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: "stretch",
        // overflow: 'hidden'
    },
});
