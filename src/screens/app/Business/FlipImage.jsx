
import React, { useState, useRef } from 'react';
import { View, Image, TouchableWithoutFeedback, Animated, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const IMAGE_SIZE = width * 1; // 80% of screen width

const FlipImage = () => {
    const [flipped, setFlipped] = useState(false);
    const flipAnim = useRef(new Animated.Value(0)).current;

    const frontImage = require('../../../assets/card01.png');
    const backImage = require('../../../assets/card02.png');

    const flipToValue = flipped ? 0 : 1;

    const handleFlip = () => {
        Animated.timing(flipAnim, {
            toValue: flipToValue,
            duration: 800,
            useNativeDriver: true,
        }).start(() => {
            setFlipped(!flipped);
        });
    };

    const interpolateFrontImage = flipAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const interpolateBackImage = flipAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '360deg'],
    });

    const frontAnimatedStyle = {
        transform: [{ rotateY: interpolateFrontImage }],
    };

    const backAnimatedStyle = {
        transform: [{ rotateY: interpolateBackImage }],
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={handleFlip}>
                <View>
                    <Animated.View style={[styles.image, frontAnimatedStyle, flipped ? styles.hidden : styles.visible]}>
                        <Image source={frontImage} style={styles.image} />
                    </Animated.View>
                    <Animated.View style={[styles.image, backAnimatedStyle, flipped ? styles.visible : styles.hidden]}>
                        <Image source={backImage} style={styles.image} />
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        backfaceVisibility: 'hidden',
    },
    hidden: {
        position: 'absolute',
        top: 0,
    },
    visible: {
        position: 'relative',
    },
});

export default FlipImage;
