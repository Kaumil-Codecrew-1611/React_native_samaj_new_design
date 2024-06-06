import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import ApiContext from '../../../context/ApiContext';

const { width } = Dimensions.get('screen');

export default function Member() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [height1, setHeight1] = useState(100);
    const [height2, setHeight2] = useState(0);
    const [committeeMembers, setCommitteeMembers] = useState([]);

    const translateX = scrollY.interpolate({
        inputRange: [0, Math.max(height1 - height2, 1)],
        outputRange: [-width, 0]
    });

    const { allcommitteeMembersListing } = useContext(ApiContext);

    useEffect(() => {
        const fetchCommitteeMembers = async () => {
            try {
                const members = await allcommitteeMembersListing();
                setCommitteeMembers(members);
            } catch (error) {
                console.error("Failed to fetch committee members", error);
            }
        };
        fetchCommitteeMembers();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Committee Members</Text>
            </View>
            <Animated.ScrollView
                onContentSizeChange={(_, h) => setHeight1(h)}
                onLayout={e => setHeight2(e.nativeEvent.layout.height)}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
            >
                {committeeMembers.map((member) => (
                    <View style={styles.card} key={member._id}>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Full Name: </Text>
                            <Text style={styles.cardText}>{member.fullname}</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Mobile Number: </Text>
                            <Text style={styles.cardText}>{member.mobile_number}</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Village: </Text>
                            <Text style={styles.cardText}>{member.village}</Text>
                        </View>
                    </View>
                ))}
            </Animated.ScrollView>
            <Animated.View style={[styles.bar, { transform: [{ translateX }] }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingBottom: 80
    },
    header: {
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 20,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
        flexWrap: 'wrap',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 10,
        flexShrink: 1,
    },
    cardText: {
        fontSize: 16,
        color: '#333',
        flexShrink: 1,
    },
    bar: {
        height: 10,
        backgroundColor: '#3d59bf',
        width: '100%',
        position: 'absolute',
    },
});
