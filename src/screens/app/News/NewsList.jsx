import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
const { t } = useTranslation();
function NewsList({ navigation, news }) {
    var a = null;
    let IMAGE_URL = process.env.IMAGE_URL;

    const formatDate = (timestamp) => {
        if (!timestamp) {
            return t('invalidDate');
        }
        const date = new Date(Number(timestamp));
        if (isNaN(date)) {
            return t('invalidDate');
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
            if (words.length > wordLimit) {
                return words.slice(0, wordLimit).join(' ') + '...';
            }
            return plainText;
        };

        return (
            <TouchableOpacity onPress={() => { openNewsDetailsPage(item._id) }}>
                <View className='w-full'>
                    <View className="w-full overflow-hidden object-cover">
                        <Image
                            className="object-cover"
                            source={{ uri: IMAGE_URL + item.image }}
                            style={{ height: 180, width: '100%', borderRadius: 20 }}
                        />
                        <View className="flex flex-row justify-between flex-wrap items-center">
                            <View>
                                <Text className='font-bold text-[19px] tracking-tighter text-justify my-2'>
                                    {item?.title}
                                </Text>
                            </View>
                            <View>
                                <Text className="text-[13px] tracking-wider text-neutral-700 font-bold mb-2">{formatDate(item?.created_at)}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text className="text-[15px] tracking-wider mb-5 text-neutral-700 text-justify">
                            {truncateText(item?.description, 20)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View className="w-full flex flex-row justify-between flex-wrap px-3 mb-14">
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={() => news[0] && renderItems({ item: news[0], index: 0 })}
                    data={news.slice(1)}
                    renderItem={renderItems}
                    keyExtractor={item => item._id}
                    numColumns={1}
                    contentContainerStyle={{ paddingHorizontal: 12 }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        </View>
    );
}

export default NewsList;
