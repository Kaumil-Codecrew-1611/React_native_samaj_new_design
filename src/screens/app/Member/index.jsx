import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View, TouchableOpacity, Linking, FlatList } from 'react-native';
import ApiContext from '../../../context/ApiContext';
import { useTranslation } from 'react-i18next';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const { width } = Dimensions.get('screen');

export default function Member() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [height1, setHeight1] = useState(100);
    const [height2, setHeight2] = useState(0);
    const [loading, setLoading] = useState(true);
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
                setLoading(false);
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

    const renderSkeletonItem = () => {
        return (
            <SkeletonPlaceholder>
                {[1, 2, 3].map((_, index) => (
                    <View key={index} style={styles.card}>
                        <SkeletonPlaceholder.Item flexDirection="row" alignItems="flex-start" marginBottom={10}>
                            <SkeletonPlaceholder.Item width={300} height={20} borderRadius={4} marginRight={10} />
                        </SkeletonPlaceholder.Item>
                        <SkeletonPlaceholder.Item flexDirection="row" alignItems="flex-start" marginBottom={10}>
                            <SkeletonPlaceholder.Item width={300} height={20} borderRadius={4} marginRight={10} />
                        </SkeletonPlaceholder.Item>
                        <SkeletonPlaceholder.Item flexDirection="row" alignItems="flex-start" marginBottom={10}>
                            <SkeletonPlaceholder.Item width={300} height={20} borderRadius={4} marginRight={10} />
                        </SkeletonPlaceholder.Item>
                        <SkeletonPlaceholder.Item flexDirection="row" alignItems="flex-start">
                            <SkeletonPlaceholder.Item width={300} height={20} borderRadius={4} marginRight={10} />
                        </SkeletonPlaceholder.Item>
                    </View>
                ))}
            </SkeletonPlaceholder>
        );
    };

    const renderActualItem = ({ item }) => {
        return (
            <View className="bg-white rounded-xl p-5 mx-5 mb-5 shadow-2xl" key={item._id}>
                <View className="flex flex-1 flex-row items-start mb-3 flex-wrap">
                    <Text className="text-base font-bold text-black mr-2">{t('fullName')}: </Text>
                    <Text className="text-base text-black">{item.fullname}</Text>
                </View>
                <View className="flex flex-1 flex-row items-start mb-3 flex-wrap">
                    <Text className="text-base font-bold text-black mr-2">{t('position')}: </Text>
                    <Text className="text-base text-black">{item.role}</Text>
                </View>
                <View className="flex flex-1 flex-row items-start mb-3 flex-wrap">
                    <Text className="text-base font-bold text-black mr-2">{t('mobile')}: </Text>
                    <TouchableOpacity onPress={() => handleCallOpenLink("+91" + item.mobile_number)}>
                        <Text className="text-blue-700 text-base">+91 {item.mobile_number}</Text>
                    </TouchableOpacity>
                </View>
                <View className="flex flex-1 flex-row items-start mb-3 flex-wrap">
                    <Text className="text-base font-bold text-black mr-2">{t('village')}: </Text>
                    <Text className="text-base text-black">{item.village}</Text>
                </View>
            </View>
        );
    };

    return (
        <View className="bg-gray-300" style={styles.container}>
            <View style={styles.header}>
                <Text className="text-2xl font-bold text-black">{t('committeeMember')}</Text>
            </View>
            {loading ? (
                <FlatList
                    data={[1, 2, 3]}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderSkeletonItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <Animated.FlatList
                    data={committeeMembers}
                    renderItem={renderActualItem}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={(_, h) => setHeight1(h)}
                    onLayout={(e) => setHeight2(e.nativeEvent.layout.height)}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
                />
            )}
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
    bar: {
        height: 10,
        backgroundColor: '#3d59bf',
        width: '100%',
        position: 'absolute',
    },
    card: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#f3f3f3',
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
});