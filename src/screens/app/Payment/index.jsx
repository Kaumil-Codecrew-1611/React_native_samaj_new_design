import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import Button from '../../../components/Button'

function Payment({ navigation, route }) {
    const { payload } = route.params;
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
                                <Text className="text-lg tracking-wider  text-rose-700  font-extrabold">Adress:</Text>
                            </View>
                            <View className="basis-[63%]">
                                <Text className="text-base tracking-wider text-neutral-700  font-bold">{payload?.Address} </Text>
                            </View>
                        </View>

                        {/*  <View className="w-full mb-3 bg-[#E9EDF7] flex-row items-center p-4 rounded-[10px]">
                            <View className="h-full basis-[37%]">
                                <Text className="text-lg tracking-wider  text-rose-700  font-extrabold">Education:</Text>
                            </View>
                            <View className="basis-[63%]">
                                <Text className="text-base tracking-wider text-neutral-700  font-bold">12 pass</Text>
                            </View>
                        </View> */}

                    </View>
                </ScrollView>
                <View className="mb-1">
                    <Button className="bg-green-600 py-3 rounded-lg" title="Pay($10)" />
                </View>
            </View>
        </View>
    )
}

export default Payment
