import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Button from '../../../components/Button';
import { GlobalContext } from '../../../context/globalState';
import ApiContext from '../../../context/ApiContext';
import RazorpayCheckout from 'react-native-razorpay';

function Payment({ navigation, route }) {
    const { registerData, setRegisterData } = useContext(GlobalContext);
    const { state, getAmount, PayOrder, register } = useContext(ApiContext);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        fetchPaymentAmount();
    }, []);
    useEffect(() => {

        setAmount(parseFloat(state?.amountData?.value));
    }, [state.amountData])

    const fetchPaymentAmount = async () => {
        try {
            await getAmount();
        } catch (error) {
            console.error('An error occurred while fetching payment amount:', error);
        }
    };
    const [orderDataRes, setOrderDataRes] = useState(null)
    useEffect(() => {
        // if (state.orderDataResponse) payNow(state.orderDataResponse)
        setOrderDataRes(state?.orderDataResponse)
    }, [state.orderDataResponse])

    async function handlePayment() {
        try {

            const result = await PayOrder({
                firstname: registerData?.firstName,
                // personal_id: registerData?.personal_id,
                mobile_number: registerData?.mobile_number,
            });
            console.log(result, ":::::resultresultresult")
            /*   setTimeout(async () => {
                  if (state?.orderDataResponse) { */

            await payNow(result);
            /*    }
           }, 1000) */

        } catch (error) {
            console.error('An error occurred while handling payment:', error);
        }
    };

    const payNow = async (data) => {
        try {

            const options = {
                description: 'Pay to Panchal Samaj',
                image: 'https://samajapp.codecrewinfotech.com/uploads/appstore.png',
                currency: data?.order?.currency,
                order_id: data?.order?.id,
                key: data?.razorpay_key_id,
                amount: data?.order?.amount,
                name: 'Pay to Panchal Samaj',
                prefill: {
                    name: registerData?.firstName,
                    lastname: registerData?.lastName,
                    contact: registerData?.mobile_number,
                },
                theme: { color: '#0D5ADD' },
            };

            const paymentResponse = await RazorpayCheckout.open(options)
            console.log(paymentResponse, "::::paymnet response")
            const { razorpay_payment_id, status_code } = paymentResponse;


            setRegisterData({ ...registerData, payment_id: razorpay_payment_id })

            await register({ PerentsData: registerData });

            // remove data from useContext
            navigation.navigate('PaymentSuccess');
        } catch (error) {
            // remove data from useContext
            navigation.navigate('PaymentFailed');
            console.error('Payment error:', error);
        }
    };

    // const { payload } = route.params;
    const payload = {
        Name: registerData.firstName + " " + registerData.lastName,
        PhoneNo: registerData.mobile_number,
        Address: registerData.address + " " + registerData.city + " " + registerData.state + " " + registerData.pincode
    }
    return (
        <View className="flex-1 bg-green-200 relative">
            <View className="w-full absolute top-[117px] z-10 h-32 flex-row justify-center">
                <View className=" w-72 rounded-xl bg-green-600 h-full flex-row justify-center items-center">
                    <Text className="text-white text-3xl tracking-wider font-extrabold">PAYMENT</Text>
                </View>
            </View>
            <View className="w-full bg-white h-[75%] pt-24 px-8 rounded-t-[45px] overflow-hidden absolute bottom-0">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View className="flex-1 ">
                        <View className="w-full mb-3 bg-[#E9EDF7] flex-row items-center p-4 rounded-[10px]">
                            <View className="h-full basis-[37%]">
                                <Text className="text-lg tracking-wider  text-rose-700  font-extrabold">Name:</Text>
                            </View>
                            <View className="basis-[63%]">
                                <Text className="text-base tracking-wider text-neutral-700  font-bold">{payload?.Name}</Text>
                            </View>
                        </View>
                        <View className="w-full mb-3 bg-[#E9EDF7] flex-row items-center p-4 rounded-[10px]">
                            <View className="h-full basis-[37%]">
                                <Text className="text-lg tracking-wider  text-rose-700  font-extrabold">Phone:</Text>
                            </View>
                            <View className="basis-[63%]">
                                <Text className="text-base tracking-wider text-neutral-700  font-bold">{payload?.PhoneNo}</Text>
                            </View>
                        </View>
                        <View className="w-full mb-3 bg-[#E9EDF7] flex-row items-center p-4 rounded-[10px]">
                            <View className="h-full basis-[37%]">
                                <Text className="text-lg tracking-wider  text-rose-700  font-extrabold">Address:</Text>
                            </View>
                            <View className="basis-[63%]">
                                <Text className="text-base tracking-wider text-neutral-700  font-bold">{payload?.Address}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View className="mb-12">
                    <Button className="bg-green-600 py-3 rounded-lg" title={`Pay(${amount}₹)`} onPress={() => handlePayment()} />
                </View>
            </View>
        </View>
    );
}

export default Payment;
