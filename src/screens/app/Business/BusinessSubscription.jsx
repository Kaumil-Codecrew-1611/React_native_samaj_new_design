import { FlatList, Radio } from 'native-base';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ApiContext from '../../../context/ApiContext';

const BusinessSubscription = () => {

    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const [value, setValue] = useState('');
    const { allSubscriptionListing } = useContext(ApiContext);
    const animation = useMemo(() => new Animated.Value(0), []);
    const scale = animation.interpolate({ inputRange, outputRange });
    const [subscriptionListing, setSubscriptionListing] = useState([]);

    const handlePress = ((subscriptionValue) => {
        setValue(subscriptionValue);
    });

    const calculateSavings = useCallback((planPrice, planInterval, monthlyPrice) => {
        const totalReferencePrice = monthlyPrice * planInterval;
        const savings = totalReferencePrice - planPrice;
        const percentageSaved = (savings / totalReferencePrice) * 100;
        return Math.floor(percentageSaved);
    }, []);

    const getBestValuePlanIndex = useCallback(() => {
        let maxSavings = -1;
        let bestValueIndex = -1;
        subscriptionListing.forEach((plan, index) => {
            const savings = calculateSavings(plan.price, plan.interval, subscriptionListing[0].price);
            if (savings > maxSavings) {
                maxSavings = savings;
                bestValueIndex = index;
            }
        });
        return bestValueIndex;
    }, [subscriptionListing]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allSubscription = await allSubscriptionListing();
                setSubscriptionListing(allSubscription.plans);
                setValue(allSubscription.plans[0]._id);
            } catch (error) {
                console.log("Error fetching all subscriptions:", error);
            }
        };
        fetchData();
    }, []);

    const bestValuePlanIndex = useMemo(() => getBestValuePlanIndex(), [getBestValuePlanIndex]);

    const renderItem = useCallback(({ item, index }) => (
        <View className="w-screen">
            <Pressable
                onPress={() => handlePress(item._id)}
                style={[
                    styles.planCard,
                    value === item._id && styles.selectedPlan,
                    index === bestValuePlanIndex && styles.recommendedPlan
                ]}
            >
                {index === bestValuePlanIndex && (
                    <View className="absolute top-[-10px] right-3 bg-[#FFD700] px-3 py-1 rounded-xl">
                        <Text className="text-black font-bold">Best Value</Text>
                    </View>
                )}
                <Radio.Group
                    name="subscriptionPlan"
                    value={value}
                    onChange={handlePress}
                >
                    <View className="flex flex-row justify-between items-center w-full">
                        <View>
                            <Text className="text-lg text-black font-semibold">
                                {item?.interval} {item?.interval === 1 ? item.period && item.period.slice(0, -1) : item.period ? item.period : "N/A"}
                            </Text>
                            <Text className="text-lg text-black font-bold">{item.price} ₹</Text>
                            {calculateSavings(item.price, item.interval, subscriptionListing[0].price) > 0 && (
                                <Text className="text-red-400 text-lg font-bold">
                                    {calculateSavings(item.price, item.interval, subscriptionListing[0].price)}% save
                                </Text>
                            )}
                        </View>
                        <View>
                            <Radio value={item._id} my={1} />
                        </View>
                    </View>
                </Radio.Group>
            </Pressable>
        </View>
    ), [calculateSavings, handlePress, bestValuePlanIndex, subscriptionListing, value]);

    const onPressIn = useCallback(() => {
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }, [animation]);

    const onPressOut = useCallback(() => {
        Animated.spring(animation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    }, [animation]);

    const selectedPlanPrice = useMemo(() => {
        return subscriptionListing.find(plan => plan._id === value)?.price || 0;
    }, [subscriptionListing, value]);

    return (

        <View className="bg-[#E9EDF7] h-screen">

            <View className="bg-white rounded-lg m-2 p-3 mb-4">
                <Text className="text-black text-xl font-bold">Choose Your Business Card Plan</Text>
            </View>

            <FlatList
                data={subscriptionListing}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ marginTop: 2, padding: 1 }}
            />

            <View className="absolute bottom-16 w-screen p-3 bg-white rounded">
                <View className="flex flex-row justify-between items-center w-full">

                    <View className="w-[40%]">
                        <Text className="text-black text-lg">
                            Total Pay <Text className="font-bold"> {selectedPlanPrice} ₹ </Text>
                        </Text>
                    </View>

                    <View className="w-[60%]">
                        <Animated.View style={[{ transform: [{ scale }] }]} className="flex justify-center items-center">
                            <TouchableOpacity
                                activeOpacity={1}
                                onPressIn={onPressIn}
                                onPressOut={onPressOut}
                                className="bg-blue-600 p-3 rounded-lg flex flex-row justify-center w-full"
                            >
                                <Text className="text-white text-lg font-bold">Subscribe Now</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>

                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({

    planCard: {
        backgroundColor: 'rgba(255, 255, 255,1)',
        borderRadius: 15,
        padding: 10,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginBottom: 25,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    selectedPlan: {
        borderColor: "blue",
        borderWidth: 2,
        transform: [{ scale: 1.05 }],
    },

    recommendedPlan: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },

});

export default React.memo(BusinessSubscription);