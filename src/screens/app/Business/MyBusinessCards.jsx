import { useFocusEffect } from '@react-navigation/native';
import { t } from 'i18next';
import { Pressable } from 'native-base';
import React, { useCallback, useContext, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    FlatList,
    Image,
    Linking,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AddBusinessIcon from '../../../assets/addBusiness.svg';
import AppIcon from '../../../components/AppIcon';
import NoDataFound from '../../../components/NoDataFound/NoDataFound';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';
import { getTemplateById } from '../../../utils/BusinessUtils';

const MyBusinessCards = ({ navigation }) => {

    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const [loading, setLoading] = useState(true);
    const [myBusinessCard, setMyBusinessCard] = useState("");
    const { allUserInfo } = useContext(GlobalContext);
    const userCardId = allUserInfo._id;
    const calcelSubscription = new Animated.Value(0);
    const cancelSubSucessAnimation = new Animated.Value(0);
    const animationOnPressOfAddBusiness = new Animated.Value(0);
    const cancelsubscriptionpopupAnimation = new Animated.Value(0);
    const { userBusinessCard, cancelSubscriptionForUser } = useContext(ApiContext);
    const scale = animationOnPressOfAddBusiness.interpolate({ inputRange, outputRange });
    const [cancelSubscriptionmodalVisible, setCancelSubscriptionmodalVisible] = useState(false);
    const cancelSubscriptionPopUpScale = cancelsubscriptionpopupAnimation.interpolate({ inputRange, outputRange });
    const cancelSubSucessScale = cancelSubSucessAnimation.interpolate({ inputRange, outputRange });
    const cancelSubscriptionScale = calcelSubscription.interpolate({ inputRange, outputRange });
    const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);
    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);

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

    const renderItem = ({ item, index }) => {

        let selectedTemplate = getTemplateById(item.template_id);
        console.log(selectedTemplate.user_templ)
        const backgroundColor = index % 2 === 0 ? '#0056b3' : 'orange';
        const animation = new Animated.Value(0);
        const editAnimation = new Animated.Value(0);
        const scale = animation.interpolate({ inputRange, outputRange });
        const editBusinessCardScale = editAnimation.interpolate({ inputRange, outputRange });

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

        const onPressEditCardIn = () => {
            Animated.spring(editAnimation, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        };

        const onPressEditCardOut = () => {
            Animated.spring(editAnimation, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        };

        const handleEditBusinessCard = (id) => {
            navigation.navigate("EditBusinessDetails", { businessId: id, userId: userCardId })
        }
        const handleNavigation = () => {
            console.log(item.template_id, "item.template_id")
            navigation.navigate(selectedTemplate.user_templ, { item })
        }

        return (
            <View className="p-3">
                <Animated.View style={[{ transform: [{ scale }] }]}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPressIn={onPressIn}
                        onPressOut={onPressOut}
                        onPress={handleNavigation}
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
                                <View className="flex flex-row justify-between items-center mt-2">
                                    <Animated.View style={[{ transform: [{ scale: editBusinessCardScale }] }]}>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPressIn={onPressEditCardIn}
                                            onPressOut={onPressEditCardOut}
                                            onPress={() => handleEditBusinessCard(item._id)}
                                        >
                                            <View>
                                                <Image className="w-9 h-9" source={require("../../../assets/edit.png")} />
                                            </View>
                                        </TouchableOpacity>
                                    </Animated.View>

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

    const onPressSubscriptionpopupCancelIn = () => {
        Animated.spring(cancelsubscriptionpopupAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressSubscriptionpopupOut = () => {
        Animated.spring(cancelsubscriptionpopupAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressSubCancelSucessIn = () => {
        Animated.spring(cancelSubSucessAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressSubCancelSucessOut = () => {
        Animated.spring(cancelSubSucessAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressCacelSubscriptionIn = () => {
        Animated.spring(calcelSubscription, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressCancelSubscriptionOut = () => {
        Animated.spring(calcelSubscription, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const handleCacelSubSucess = async () => {
        setLoading(true)
        const userIdForCancelSubscription = allUserInfo?._id;
        await cancelSubscriptionForUser(userIdForCancelSubscription)
        setLoading(false)
        setCancelSubscriptionmodalVisible(false)
        toastMessage("subscription cancel sucessfully", 'Success');
    };

    const openCancelSubscriptionModal = async () => {
        setCancelSubscriptionmodalVisible(true)
    };

    const closeCancelSubscriptionModal = async () => {
        setCancelSubscriptionmodalVisible(false)
    };

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
            {myBusinessCard && myBusinessCard?.length < 1 ?
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
                :
                <Animated.View className="px-3" style={[{ transform: [{ scale: cancelSubscriptionScale }] }]} >
                    <Pressable
                        activeOpacity={1}
                        onPressIn={onPressCacelSubscriptionIn}
                        onPressOut={onPressCancelSubscriptionOut}
                        onPress={openCancelSubscriptionModal}
                        className="flex flex-row items-center justify-between shadow-black bg-white rounded-[15px] shadow-input mx-0.5 shadow-md p-3 mt-2"
                    >
                        <View className="flex-row justify-between gap-2 items-center">
                            <AnimatedFeatherIcon name="users" size={30} color={"black"} />
                            <Text className="text-neutral-700 font-normal text-xl tracking-wider">
                                {t("CancelSubscription")}
                            </Text>
                        </View>
                        <AnimatedFontistoIcon name="angle-right" size={15} color={"black"} />
                    </Pressable>
                </Animated.View>
            }

            {loading ? (
                renderSkeleton()
            ) : myBusinessCard?.length === 0 ? (
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

            <Modal
                transparent={true}
                visible={cancelSubscriptionmodalVisible}
                animationType="slideTop"
                onRequestClose={closeCancelSubscriptionModal}
            >
                <View className="flex-1 justify-top items-center">
                    {cancelSubscriptionmodalVisible && (
                        <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                    )}
                    <View className="w-4/5 bg-white rounded-[15px] px-3 py-4 shadow-lg mt-[90%]">
                        <Text className="text-lg text-black mb-4">{t("confirmSubscriptionCacel")}</Text>
                        <View className="flex-row justify-around">

                            <Animated.View style={[{ transform: [{ scale: cancelSubscriptionPopUpScale }] }]} >
                                <Pressable
                                    activeOpacity={1}
                                    onPressIn={onPressSubscriptionpopupCancelIn}
                                    onPressOut={onPressSubscriptionpopupOut}
                                    onPress={closeCancelSubscriptionModal}
                                    className="px-6 py-3 bg-gray-400 rounded-[15px] mr-2"
                                >
                                    <Text className="text-white">{t('cancel')}</Text>
                                </Pressable>
                            </Animated.View>

                            <View>
                                {loading ? (
                                    <View className="px-6 py-3 bg-red-500 rounded-[15px] flex flex-row">
                                        <Text className="text-white mr-4">{t("Loading")}</Text>
                                        <ActivityIndicator size="small" color="white" />
                                    </View>
                                ) : (
                                    <Animated.View style={[{ transform: [{ scale: cancelSubSucessScale }] }]} >
                                        <Pressable
                                            activeOpacity={1}
                                            onPressIn={onPressSubCancelSucessIn}
                                            onPressOut={onPressSubCancelSucessOut}
                                            onPress={() => handleCacelSubSucess()} disabled={loading}
                                            className="px-6 py-3 bg-red-500 rounded-[15px]"
                                        >
                                            <Text className="text-white ">{t('cacelSubScription')}</Text>
                                        </Pressable>
                                    </Animated.View>
                                )}
                            </View>

                        </View>
                    </View>
                </View>
            </Modal>

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