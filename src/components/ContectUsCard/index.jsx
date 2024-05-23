import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import Animated from 'react-native-reanimated';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
function ContectUsCard() {
    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);
    const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
            <View className="mb-20">
                <View className="w-full h-56 p-4">
                    <View className="w-full bg-[#E9EDF7] h-full rounded-[20px] p-5">
                        <View className="w-full h-full">
                            <View className="mb-3 w-full flex flex-row gap-3 items-center">
                                <AnimatedFontistoIcon
                                    name="mobile"
                                    size={25}
                                />
                                {/* <Image
                                    source={callIcon}
                                    className="w-[40px] h-[40px] mr-3 rounded-[60px]"
                                /> */}
                                <Text className=" text-xl tracking-wider text-neutral-700 font-extrabold">Phone</Text>
                            </View>
                            <View className="mb-4 h-14">
                                <Text className="tracking-wider text-neutral-700">You ca call, text or whatsapp on below numbers. Charges will be applied as per your network problem</Text>
                            </View>
                            <View>
                                <Text className="text-[#5176df] font-extrabold text-xl">+91 900026514</Text>
                            </View>
                        </View>
                    </View>

                </View>

                <View className="w-full h-56 p-4">

                    <View className="w-full bg-[#E9EDF7] h-full rounded-[20px] p-5">
                        <View className="w-full h-full">
                            <View className="mb-3 w-full flex gap-3 flex-row items-center">
                                <AnimatedFontistoIcon
                                    name="email"
                                    size={25}
                                />

                                <Text className=" text-xl tracking-wider text-neutral-700 font-extrabold">E-mail</Text>
                            </View>
                            <View className="mb-4 h-11">

                                <Text className="tracking-wider text-neutral-700">We response to mails whithin 24 hours</Text>
                            </View>
                            <View>
                                <Text className="text-[#5176df] font-extrabold text-xl">support@hindio</Text>
                            </View>
                        </View>
                    </View>

                </View>

                <View className="w-full h-56 p-4">

                    <View className="w-full bg-[#E9EDF7] h-full rounded-[20px] p-5">
                        <View className="w-full h-full">
                            <View className="mb-3 w-full flex gap-3 flex-row items-center">
                                <AnimatedFeatherIcon
                                    name="users"
                                    size={25}
                                />
                                <Text className="text-xl tracking-wider text-neutral-700 font-extrabold">Socials</Text>
                            </View>
                            <View className="mb-4 h-11">

                                <Text className="tracking-wider text-neutral-700">Foolow with our social to get modified with updates offers</Text>
                            </View>
                            <View className="flex flex-row w-full gap-3">
                                <AnimatedFontistoIcon
                                    name="twitter"
                                    size={25}
                                />
                                <AnimatedFontistoIcon
                                    name="instagram"
                                    size={25}
                                />
                                <AnimatedFontistoIcon
                                    name="facebook"
                                    size={25}
                                />

                            </View>
                        </View>
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}

export default ContectUsCard
