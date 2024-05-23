import React from 'react'
import { ImageBackground, View, Image, Text, ScrollView } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'


function NewsList({ news }) {
    var a = null;

    const renderItems = ({ item, index }) => {

        if (a == 0) {
            a++;
        } else {
            a = index;
        }

        return (
            <View className={a == 0 ? 'w-full my-4' : 'w-[46%] my-4 '}>
                <View className="w-full rounded-[20px] overflow-hidden">
                    <ImageBackground
                        source={{ uri: item.image }}
                        className="h-44 rounded-[20px] object-cover"
                    >
                        <View className={"bg-[#423f3f66] flex-1 flex-row items-end"}>
                            <Text className="text-white ml-7 mb-4 font-bold text-[25px]">{item.title}</Text>
                        </View>
                    </ImageBackground>
                </View>

                <View className="w-full flex flex-row items-center my-2">
                    <View className={a == 0 ? "basis-[20%]  flex flex-row justify-center items-center" : "basis-[20%] mr-4 flex flex-row justify-center items-center"}>
                        <Image
                            source={{ uri: item.profile }}
                            className="w-[40px] h-[40px] rounded-[60px]"
                        />
                    </View>
                    <View className="basis-[80%]">
                        <Text className="text-[15px] tracking-wider text-neutral-700 font-extrabold">{item.name}</Text>
                        <Text className="text-[13px] tracking-wider text-neutral-700 font-bold">{item.day}</Text>
                    </View>
                </View>
            </View>
        );

    }
    return (
        <View className="w-full flex flex-row justify-between flex-wrap px-3 mb-10">
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={() => news[0] && renderItems({ item: news[0], index: 0 })}
                    data={news.slice(1)}
                    renderItem={renderItems}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    contentContainerStyle={{ paddingHorizontal: 12 }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        </View>

    )
}

export default NewsList



