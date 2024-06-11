import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import ApiContext from '../../../context/ApiContext';
import { useTranslation } from 'react-i18next';
const { width } = Dimensions.get('screen');

export default function Member() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [height1, setHeight1] = useState(100);
    const [height2, setHeight2] = useState(0);
    const [committeeMembers, setCommitteeMembers] = useState([]);
    const { t } = useTranslation();
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

    const handleCallOpenLink = (phoneNumber) => {
        if (phoneNumber) {
            Linking.openURL(`tel:${phoneNumber}`);
        }
    };

    return (
        <View className="bg-gray-300" style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{t('committeeMember')}</Text>
            </View>
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                onContentSizeChange={(_, h) => setHeight1(h)}
                onLayout={e => setHeight2(e.nativeEvent.layout.height)}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
            >
                {committeeMembers.map((member) => (
                    <View className="bg-white rounded-xl p-5 mx-5 mb-5 shadow-2xl" key={member._id}>
                        <View className="flex flex-1 flex-row items-start mb-3 flex-wrap">
                            <Text className="text-base font-bold text-black mr-2">{t('fullName')}: </Text>
                            <Text className="text-base text-black">{member.fullname}</Text>
                        </View>
                        <View className="flex flex-1 flex-row items-start mb-3 flex-wrap">
                            <Text className="text-base font-bold text-black mr-2">{t('position')}: </Text>
                            <Text className="text-base text-black">{member.role}</Text>
                        </View>
                        <View className="flex flex-1 flex-row items-start mb-3 flex-wrap">
                            <Text className="text-base font-bold text-black mr-2">{t('mobile')}: </Text>
                            <TouchableOpacity onPress={() => handleCallOpenLink("+91" + member.mobile_number)}>
                                <Text className="text-blue-700 text-base">+91 {member.mobile_number}</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex flex-1 flex-row items-start mb-3 flex-wrap">
                            <Text className="text-base font-bold text-black mr-2">{t('village')}: </Text>
                            <Text className="text-base text-black">{member.village}</Text>
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
    bar: {
        height: 10,
        backgroundColor: '#3d59bf',
        width: '100%',
        position: 'absolute',
    },
});
