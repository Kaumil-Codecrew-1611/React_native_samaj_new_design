import React from 'react'
import { Text, View } from 'react-native'
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import Button from '../../../../components/Button';

function PaymentFailed({ navigation }) {

    const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);

    return (
        <View className="bg-[#fafafa] flex-1">
            <View className="flex-row mt-10 mb-5 items-center justify-center">
                <View className="w-[130px] h-[130px] rounded-[130px] bg-red-500 flex-row items-center justify-center">
                    <AnimatedFeatherIcon
                        name="x"
                        size={65}
                        color="white"
                    />
                </View>
            </View>

            <View className="relative flex-1 px-5">
                <View >
                    <Text className="tracking-wider marker:text-center my-3 text-3xl font-extrabold text-neutral-700">Payment Failed</Text>
                    <Text className="tracking-wider  mb-3 text-lg font-semibold text-neutral-700">We can't proccess your payment check your internet connection and try again.</Text>
                </View>

                <View className="bg-white my-4 w-full p-3 rounded-[15px]" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 }}>
                    <View className="flex-row mb-3 items-center justify-between" >
                        <Text className="tracking-wider text-xl mr-7  text-[#acacac]">Name</Text>
                        <Text className="tracking-wider text-lg font-semibold text-neutral-700">Ajay Varma</Text>
                    </View>

                    <View className="flex-row my-2 mb-6 items-center justify-between" >
                        <Text className="tracking-wider text-xl mr-7  text-[#acacac]">Phone No</Text>
                        <Text className="tracking-wider text-lg font-semibold text-neutral-700">12345679890</Text>
                    </View>

                    <View className="h-[1px] mb-3 bg-neutral-400"></View>

                    <View className="flex-row items-center justify-between" >
                        <Text className="tracking-wider text-xl mr-7  text-[#acacac]">Total Amount</Text>
                        <Text className="tracking-wider text-xl font-extrabold text-[#dc6a72]">100 (FAILED)</Text>
                    </View>
                </View>

                <View className=" w-full left-5 absolute bottom-16">
                    <Button className="bg-[#f56f4c] py-4 rounded-[20px]" title="Try Again" onPress={() => navigation.navigate('Payment')} />
                </View>
            </View>
        </View>
    )
}

export default PaymentFailed