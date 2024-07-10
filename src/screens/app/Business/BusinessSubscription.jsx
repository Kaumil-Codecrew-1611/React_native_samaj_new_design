import { Radio, ScrollView } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ApiContext from '../../../context/ApiContext';

const BusinessSubscription = () => {

    const [value, setValue] = useState('');
    const { allSubscriptionListing } = useContext(ApiContext);
    const [subscriptionListing, setSubscriptionListing] = useState([]);
    const [isSubscribeDisabled, setIsSubscribeDisabled] = useState(true);

    const handlePress = (subscriptionValue) => {
        setValue(prevValue => (prevValue === subscriptionValue ? '' : subscriptionValue));
    };

    const calculateSavings = (planPrice, planInterval, monthlyPrice) => {
        const totalReferencePrice = monthlyPrice * planInterval;
        const savings = totalReferencePrice - planPrice;
        const percentageSaved = (savings / totalReferencePrice) * 100;
        return Math.floor(percentageSaved);
    };

    const getBestValuePlanIndex = () => {
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
    };

    useEffect(() => {
        (async function () {
            try {
                const allSubscription = await allSubscriptionListing();
                setSubscriptionListing(allSubscription.plans);
            } catch (error) {
                console.log("error of all subscription", error)
            }
        })();
    }, []);

    useEffect(() => {
        setIsSubscribeDisabled(value === '');
    }, [value]);

    const bestValuePlanIndex = getBestValuePlanIndex();

    return (
        <View className="p-5 bg-[#E9EDF7] h-screen">
            <View className="bg-white rounded-lg p-2 mb-2">
                <Text className="text-black text-xl font-bold">Choose Your Business Card Plan</Text>
            </View>

            <ScrollView>
                <View className="mt-2 p-1">
                    {subscriptionListing && subscriptionListing.map((plan, index) => (
                        <Pressable
                            key={index}
                            onPress={() => {
                                handlePress(plan.interval);
                            }}
                            style={[
                                styles.planCard,
                                value === plan.interval && styles.selectedPlan,
                                index === bestValuePlanIndex && styles.recommendedPlan
                            ]}
                        >
                            {index === bestValuePlanIndex && (
                                <View className="absolute top-[-10px] right-3 bg-[#FFD700] px-3 py-1 rounded-xl">
                                    <Text className="text-black font-bold">Best Value</Text>
                                </View>
                            )}
                            <View>
                                <Text className="text-lg text-black font-semibold">
                                    {plan?.interval} {plan?.interval && plan.interval === 1 ? plan.period && plan.period.slice(0, -1) : plan.period ? plan.period : "N/A"}
                                </Text>
                                <Text className="text-lg text-black font-bold">{plan.price} ₹</Text>
                                {calculateSavings(plan.price, plan.interval, subscriptionListing[0].price) > 0 && (
                                    <Text className="text-red-400 text-lg font-bold">
                                        {calculateSavings(plan.price, plan.interval, subscriptionListing[0].price)}% save
                                    </Text>
                                )}
                            </View>
                            <Radio
                                value={plan.duration}
                                isChecked={value === plan.duration}
                                colorScheme="green"
                                size="lg"
                            />
                        </Pressable>
                    ))}
                </View>
            </ScrollView>

            <View className="absolute bottom-16 w-screen flex flex-row justify-center">
                <Pressable
                    disabled={isSubscribeDisabled}
                    className={`bg-blue-600 py-4 rounded-lg flex flex-row justify-center px-24 ${isSubscribeDisabled ? 'opacity-50' : ''}`}
                >
                    <Text className="text-white text-xl font-bold">Subscribe Now</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    planCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 15,
        padding: 10,
        marginBottom: 15,
        flexDirection: 'row',
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

export default BusinessSubscription;
