import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import ApiContext from '../../context/ApiContext';

const cardHeight = 85;
const padding = 10;
const offset = cardHeight + padding;

const VillageByName = ({ searchValue, navigation }) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const { state } = useContext(ApiContext);
    const [userByVillageId, setUserVillageId] = useState([]);

    useEffect(() => {
        if (state.allUserByVillage) {
            setUserVillageId(state.allUserByVillage);
        }
    }, [state.allUserByVillage]);

    const formattedContacts = userByVillageId.map(user => ({
        id: user._id,
        image: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
        name: `${user.firstname} ${user.middlename} ${user.lastname}`,
        village: user.city,
    }));

    const filteredContacts = formattedContacts.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <FlatList
            style={styles.container}
            data={filteredContacts}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                useNativeDriver: false,
            })}
            keyExtractor={item => item.id}
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
                return (
                    <Pressable onPress={() => navigation.navigate('ViewFamilyDetails', { id: item.id })}>
                        <Animated.View
                            style={[styles.card, { opacity, transform: [{ translateY }, { scale }] }]}
                        >
                            <View style={styles.imageContainer}>
                                <Image style={styles.image} source={{ uri: item.image }} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.village}>{item.village}</Text>
                            </View>
                        </Animated.View>
                    </Pressable>
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
    },
    imageContainer: {
        flexBasis: '25%',
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        objectCover: 'cover',
    },
    textContainer: {
        flexBasis: '75%',
        paddingRight: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    village: {
        fontSize: 15,
        fontWeight: '500',
    },
});
