import React, { useRef } from 'react';
import { Animated, FlatList, StyleSheet } from 'react-native';

const data = new Array(20).fill().map((x, i) => i + 1);
const cardHeight = 120;
const padding = 10;
const offset = cardHeight + padding;

const DirectoryScreen = () => {
    const scrollY = useRef(new Animated.Value(0)).current;
    return (
        <FlatList
            style={styles.container}
            data={data}
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
                return (
                    <Animated.View
                        style={[styles.card, { opacity, transform: [{ translateY }, { scale }] }]}
                    >
                        <Animated.Text style={styles.cardText}>{item}</Animated.Text>
                    </Animated.View>
                );
            }}
        />
    );
};

export default DirectoryScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        paddingVertical: padding / 2,
    },
    card: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: padding / 2,
        height: cardHeight,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
