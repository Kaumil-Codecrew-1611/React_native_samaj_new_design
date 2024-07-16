import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import { Animated, FlatList, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AddBusinessIcon from '../../../assets/addBusiness.svg';
import AppIcon from '../../../components/AppIcon';
import NoDataFound from '../../../components/NoDataFound/NoDataFound';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';

const MyBusinessCards = ({ navigation }) => {

    const [loading, setLoading] = useState(true);
    const [myBusinessCard, setMyBusinessCard] = useState("");
    const { userBusinessCard } = useContext(ApiContext);
    const { allUserInfo } = useContext(GlobalContext);
    const userCardId = allUserInfo._id;

    const fetchData = async () => {
        try {
            setLoading(true);
            const userBusinessCardApi = await userBusinessCard(userCardId);
            setMyBusinessCard(userBusinessCardApi.businesses);
        } catch (error) {
            console.log(error, "error for getting data of business cards");
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [userCardId])
    );

    const handleCallOpenLink = (phoneNumber) => {
        if (phoneNumber) {
            Linking.openURL(`tel:${phoneNumber}`);
        }
    };

    const handleClickOnMail = (mail) => {
        if (mail) {
            Linking.openURL(`mailto:${mail}`);
        }
    };

    const inputRange = [0, 1];
    const outputRange = [1, 0.8];

    const renderItem = ({ item, index }) => {

        const backgroundColor = index % 2 === 0 ? '#0056b3' : 'orange';
        const animation = new Animated.Value(0);

        const scale = animation.interpolate({ inputRange, outputRange });

        const onPressIn = () => {
            Animated.spring(animation, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        };

        const onPressOut = () => {
            Animated.spring(animation, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        };

        const handleOpenCardOfBusiness = (images, id) => {
            {
                item.status === "payment_pending"
                    ? navigation.navigate('EditBusinessDetails', { businessId: id })
                    : navigation.navigate('FlipImage', { images: images })
            }

        }

        return (
            <View className="p-3">
                <Animated.View style={[{ transform: [{ scale }] }]}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPressIn={onPressIn}
                        onPressOut={onPressOut}
                        onPress={() => handleOpenCardOfBusiness(item.images, item._id)}
                    >
                        <LinearGradient
                            colors={[backgroundColor, backgroundColor]}
                            className="overflow-hidden rounded-lg"
                        >
                            <View className="p-4 flex flex-row">
                                <View>
                                    <Text className="text-white text-2xl w-64 font-bold">{item.name}</Text>
                                    <Text className="text-white text-lg w-64 mb-4">{item.role} of {item.businessName}</Text>
                                </View>
                                <View className="w-40 h-50" style={{ height: 40, backgroundColor: '#ffffff', transform: [{ rotate: '45deg' }], position: 'absolute', top: -20, right: -20 }} />
                            </View>

                            <View className="bg-white p-4">
                                <View className="flex flex-row flex-wrap items-center">
                                    <Text className="text-black text-lg font-bold">Mobile Number : </Text>
                                    <TouchableOpacity onPress={() => handleCallOpenLink(item.businessContactNumber)}>
                                        <Text className="text-[#5176df] tracking-wider text-md font-medium">{item.businessContactNumber}</Text>
                                    </TouchableOpacity>
                                    {item.phoneNumber2 &&
                                        <Text> , </Text>
                                    }
                                    <TouchableOpacity onPress={() => handleCallOpenLink(item.phoneNumber2)}>
                                        <Text className="text-[#5176df] tracking-wider text-md font-medium">{item.phoneNumber2}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View className="flex flex-row flex-wrap items-center">
                                    <Text className="text-black text-lg font-bold">Address : </Text>
                                    <TouchableOpacity
                                        className="ms-2"
                                        onPress={() => Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(item.address))}
                                    >
                                        <Text className="text-[#5176df] tracking-wider text-md font-medium">{item.address}</Text>
                                    </TouchableOpacity>
                                </View>
                                {item.businessWebsite &&
                                    <View className="flex flex-row flex-wrap items-center">
                                        <Text className="text-black text-lg font-bold">Website Link : </Text>
                                        <TouchableOpacity onPress={() => handleClickOnMail(item.businessWebsite)}>
                                            <Text className="text-[#5176df] tracking-wider text-md font-medium">{item.businessWebsite}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                <View className="flex items-end mt-2">
                                    {item.status === "payment_pending" ?
                                        <View className="bg-red-100 w-[33%] rounded-md p-2">
                                            <Text className="text-red-700 text-xs">Payment Pending</Text>
                                        </View>
                                        :
                                        <View className="bg-blue-100 w-[22%] rounded-md p-1">
                                            <Text className="text-blue-700">Published</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>
            </View >
        );
    };

    const renderSkeleton = () => (
        [...Array(5)].map((_, index) => (
            <SkeletonPlaceholder key={index}>
                <SkeletonPlaceholder.Item
                    flexDirection="row"
                    alignItems="center"
                    marginHorizontal={12}
                    marginVertical={10}
                    height={100}
                    borderWidth={3}
                    padding={5}
                    borderColor={'#f3f3f3'}
                    borderRadius={10}
                >
                    <SkeletonPlaceholder.Item marginLeft={20}>
                        <SkeletonPlaceholder.Item width={300} height={20} borderRadius={4} />
                        <SkeletonPlaceholder.Item marginTop={6} width={250} height={20} borderRadius={4} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        ))
    );

    const animationOnPressOfAddBusiness = new Animated.Value(0);
    const scale = animationOnPressOfAddBusiness.interpolate({ inputRange, outputRange });

    const onPressInAddBusiness = () => {
        Animated.spring(animationOnPressOfAddBusiness, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressOutAddBusiness = () => {
        Animated.spring(animationOnPressOfAddBusiness, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View className="bg-[#E9EDF7] h-full">
            <View className="px-3">
                <View className="bg-white rounded-lg p-2 flex flex-row items-center mt-2 mb-2" style={styles.shadowOfCard}>
                    <View className="mr-3">
                        <AddBusinessIcon width={40} height={40} color='black' />
                    </View>
                    <Animated.View style={[{ transform: [{ scale }] }]} className="absolute right-2 bg-blue-100 rounded-xl p-2">
                        <TouchableOpacity
                            activeOpacity={1}
                            onPressIn={onPressInAddBusiness}
                            onPressOut={onPressOutAddBusiness}
                            onPress={() => navigation.navigate('SelectBusinessTemplate')}
                        >
                            <View className="w-full flex-row items-center gap-1 ">
                                <AppIcon type="Feather" color={"#3b82f6"} name="plus-circle" size={26} />
                                <Text className="text-blue-500 text-lg font-bold">
                                    Business
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
            {loading ? (
                renderSkeleton()
            ) : myBusinessCard.length === 0 ? (
                <NoDataFound message={"There are no Business"} />
            ) : (
                <FlatList
                    data={myBusinessCard}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    shadowOfCard: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4
    },
});

export default MyBusinessCards;