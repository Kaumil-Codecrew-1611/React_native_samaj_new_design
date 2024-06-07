import React from 'react'
import { Text, View } from 'react-native'
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import Button from '../../../../components/Button';
import { useTranslation } from 'react-i18next';
const { t } = useTranslation();

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
                    <Text className="tracking-wider marker:text-center my-3 text-3xl font-extrabold text-neutral-700">{t('paymentFailed')}</Text>
                    <Text className="tracking-wider  mb-3 text-lg font-semibold text-neutral-700">{t('paymentFailed')}{t('failpaymentmessage')}</Text>
                </View>

                <View className="bg-white my-4 w-full p-3 rounded-[15px]" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 }}>
                    <View className="flex-row mb-3 items-center justify-between" >
                        <Text className="tracking-wider text-xl mr-7  text-[#acacac]">{t('name')}</Text>
                        <Text className="tracking-wider text-lg font-semibold text-neutral-700">{data?.registerData?.firstname + " " + data?.registerData?.lastname}</Text>
                    </View>

                    <View className="flex-row my-2 mb-6 items-center justify-between" >
                        <Text className="tracking-wider text-xl mr-7  text-[#acacac]">{t('mobile')}</Text>
                        <Text className="tracking-wider text-lg font-semibold text-neutral-700">{data?.registerData?.mobile_number}</Text>
                    </View>

                    <View className="h-[1px] mb-3 bg-neutral-400"></View>

                    <View className="flex-row items-center justify-between" >
                        <Text className="tracking-wider text-xl mr-7  text-[#acacac]">{t('TotalAmount')}</Text>
                        <Text className="tracking-wider text-xl font-extrabold text-[#e1a58a]">{data?.amount / 100} (PAID)</Text>
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
