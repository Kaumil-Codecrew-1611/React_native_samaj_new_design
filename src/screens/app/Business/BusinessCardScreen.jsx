import { View } from 'native-base';
import React, { useRef, useState } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import Card1 from './BusinessComponent/Card1';
import Card2 from './BusinessComponent/Card2';

const BusinessCardScreen = () => {

    const [flipped, setFlipped] = useState(false);
    const flipAnim = useRef(new Animated.Value(0)).current;

    const handleFlip = () => {
        const flipToValue = flipped ? 0 : 1;
        Animated.timing(flipAnim, {
            toValue: flipToValue,
            duration: 1000,
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
        <TouchableWithoutFeedback onPress={handleFlip}>
            <View style={styles.container}>
                <View className="p-3 w-screen bg-blue-100">
                    <Animated.View style={[styles.card, frontAnimatedStyle, flipped ? styles.hidden : styles.visible]}>
                        <Card1 />
                    </Animated.View>
                    <Animated.View style={[styles.card, backAnimatedStyle, flipped ? styles.visible : styles.hidden]}>
                        <Card2 />
                    </Animated.View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = {
    card: {
        width: '100%',
        backfaceVisibility: 'hidden',
    },
    hidden: {
        position: 'absolute',
    },
    visible: {
        position: 'relative',
    },
};

export default BusinessCardScreen;