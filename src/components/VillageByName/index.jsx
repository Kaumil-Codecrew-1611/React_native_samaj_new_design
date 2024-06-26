import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ApiContext from '../../context/ApiContext';
import NoDataFound from '../NoDataFound/NoDataFound';

const cardHeight = 100;
const padding = 10;
const offset = cardHeight + padding;

const VillageByName = ({ searchValue, navigation, SelectedVillage }) => {

    const scrollY = useRef(new Animated.Value(0)).current;
    const { state } = useContext(ApiContext);
    const [userByVillageId, setUserVillageId] = useState([]);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const viewImage = (img) => {
        setImage(img);
        setIsVisible(true);
    }

    useEffect(() => {
        if (state.allUserByVillage) {
            setUserVillageId(state.allUserByVillage);
            setLoading(false);
        }
    }, [state.allUserByVillage]);

    const formattedContacts = userByVillageId.map(user => ({
        id: user._id,
        image: process.env.IMAGE_URL + user?.photo,
        name: `${user.firstname} ${user.middlename} ${user.lastname}`,
        city: user.city,
        village: SelectedVillage.villageE,
    }));

    const filteredContacts = formattedContacts.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <>
            {loading ? (
                <FlatList
                    data={Array.from({ length: 10 })}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={() => (
                        <SkeletonPlaceholder>
                            <SkeletonPlaceholder.Item
                                flexDirection="row"
                                alignItems="center"
                                marginHorizontal={12}
                                marginVertical={padding / 2}
                                height={cardHeight}
                                borderWidth={1}
                                padding={padding}
                                borderColor={'#f3f3f3'}
                                borderRadius={10}
                            >
                                <SkeletonPlaceholder.Item width={60} height={60} borderRadius={30} />
                                <SkeletonPlaceholder.Item marginLeft={20}>
                                    <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
                                    <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} borderRadius={4} />
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder>
                    )}
                />
            ) : (
                filteredContacts.length === 0 ? (
                    <NoDataFound message={"There are no person details in this village screen."} />
                ) : (
                    <FlatList
                        style={styles.container}
                        data={filteredContacts}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: false }
                        )}
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
                                        <Pressable onPress={() => viewImage(item.image)} style={styles.imageContainer}>
                                            <Image style={styles.image} source={{ uri: item.image }} />
                                        </Pressable>
                                        <View className="flex flex-1">
                                            <Text className="text-lg font-bold">{item.name}</Text>
                                            <Text className="capitalize text-base font-semibold">{item.city} - {item.village}</Text>
                                        </View>
                                    </Animated.View>
                                </Pressable>
                            );
                        }}
                    />
                )
            )}
            <ImageViewing
                images={[{ uri: image }]}
                imageIndex={0}
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
            />
        </>
    );
};

export default VillageByName;

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: "row",
        marginHorizontal: 12,
        marginVertical: padding / 2,
        padding: 10,
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
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        overflow: 'hidden',
    },
});
