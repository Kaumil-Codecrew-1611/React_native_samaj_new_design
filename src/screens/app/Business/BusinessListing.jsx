import React, { useContext, useEffect, useState } from 'react';
import {
    Animated,
    FlatList,
    Linking,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import NoDataFound from '../../../components/NoDataFound/NoDataFound';
import ApiContext from '../../../context/ApiContext';
import { getTemplateById } from '../../../utils/BusinessUtils';
const BusinessListing = ({ navigation }) => {

    const { allUsersBussinessListing } = useContext(ApiContext);
    const [businessListing, setBusinessListing] = useState([]);

    useEffect(() => {
        (async function () {
            try {
                const contentBusinessListing = await allUsersBussinessListing();
                setBusinessListing(contentBusinessListing.businesses || []);
            } catch (error) {
                console.log("error", error);
            }
        })();
    }, []);

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

        const backgroundColor = index % 2 === 0 ? '#0056b3' : 'orange';
        const animation = new Animated.Value(0);
        const inputRange = [0, 1];
        const outputRange = [1, 0.8];
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
        console.log(item, ":::::::hey item ")
        const handleOpenCardOfBusiness = (images) => {
            const selectedTemplate = getTemplateById(item.template_id);
            navigation.navigate(selectedTemplate?.user_templ);
        }

        return (
            <View className="p-3">
                <Animated.View style={[{ transform: [{ scale }] }]}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPressIn={onPressIn}
                        onPressOut={onPressOut}
                        onPress={() => handleOpenCardOfBusiness(item.images)}
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

                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    };

    return (
        <View className="bg-[#E9EDF7] h-full">
            {businessListing.length === 0 ? (
                <NoDataFound message={"There are no Business"} />
            ) : (
                <FlatList
                    data={businessListing}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

export default BusinessListing;