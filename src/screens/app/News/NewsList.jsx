import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

function NewsList({ navigation, news, loading }) {
    var a = null;
    let IMAGE_URL = process.env.IMAGE_URL;

    const formatDate = (timestamp) => {
        if (!timestamp) {
            return 'Invalid date';
        }
        const date = new Date(Number(timestamp));
        if (isNaN(date)) {
            return 'Invalid date';
        }
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`;
    };

    const openNewsDetailsPage = (id) => {
        navigation.navigate('NewsDetailsPage', { newsId: id });
    };

    const renderItems = ({ item, index }) => {
        if (a == 0) {
            a++;
        } else {
            a = index;
        }

        const truncateText = (text, wordLimit) => {
            const plainText = text.replace(/<[^>]*>?/gm, '');
            const words = plainText.split(' ');
            if (words?.length > wordLimit) {
                return words.slice(0, wordLimit).join(' ') + '...';
            }
            return plainText;
        };

        return (
            <TouchableOpacity onPress={() => { openNewsDetailsPage(item?._id) }}>
                <View className="bg-gray-200 shadow-2xl p-2 mb-5 rounded-3xl w-[100%] mt-5">
                    <View className="overflow-hidden object-cover shadow-xl shadow-black">
                        <View className="relative">
                            <Image
                                className="object-cover"
                                source={{ uri: IMAGE_URL + item.image }}
                                style={{ height: 180, width: '100%', borderRadius: 20 }}
                            />
                            {item.createdBy && <View className="rounded-bl-[20px] bg-white absolute bottom-0 px-2">
                                <View className="flex flex-row items-center gap-2">
                                    <Text className="font-bold text-black text-base">
                                        Created By
                                    </Text>
                                    <Text className="text-base text-black font-medium">
                                        {item?.createdBy}
                                    </Text>
                                </View>
                            </View>}
                        </View>
                        <View className="flex flex-row justify-between flex-wrap items-center p-2">
                            <View>
                                <Text className='font-bold text-[19px] text-black tracking-tighter text-justify my-2'>
                                    {item?.title}
                                </Text>
                            </View>
                            <View>
                                <Text className="text-[13px] tracking-wider text-neutral-700 font-bold mb-2">{formatDate(item?.created_at)}</Text>
                            </View>
                        </View>
                        <View className="p-2">
                            <Text className="text-[15px] tracking-wider mb-5 text-neutral-700 text-justify font-semibold">
                                {truncateText(item?.description, 20)}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View className="w-full flex flex-row justify-between flex-wrap">
            <SafeAreaView style={{ flex: 1 }}>
                {loading ? (
                    <FlatList
                        data={[1, 2, 3]}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={{ padding: 10, borderWidth: 1, marginHorizontal: 10, marginBottom: 20, borderRadius: 20, borderColor: "#f3f3f3" }}>
                                <SkeletonPlaceholder>
                                    <SkeletonPlaceholder.Item flexDirection="column" alignItems="center">
                                        <SkeletonPlaceholder.Item width={'100%'} marginBottom={20} height={180} borderRadius={20} />
                                        <SkeletonPlaceholder.Item width={'100%'} marginLeft={5}>
                                            <SkeletonPlaceholder.Item width={320} height={22} borderRadius={4} marginBottom={10} />
                                            <SkeletonPlaceholder.Item width={280} height={22} borderRadius={4} marginBottom={10} />
                                            <SkeletonPlaceholder.Item width={250} height={22} borderRadius={4} marginBottom={10} />
                                            <SkeletonPlaceholder.Item width={180} height={22} borderRadius={4} marginBottom={10} />
                                        </SkeletonPlaceholder.Item>
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder>
                            </View>
                        )}
                    />
                ) : (
                    <FlatList
                        ListHeaderComponent={() => news[0] && renderItems({ item: news[0], index: 0 })}
                        data={news && news?.slice(1)}
                        renderItem={renderItems}
                        keyExtractor={(item) => item?._id}
                        contentContainerStyle={{ paddingHorizontal: 12 }}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </SafeAreaView>
        </View>
    );
}

export default NewsList;
