import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import NewsList from "./NewsList";
import ApiContext from "../../../context/ApiContext";
import { useTranslation } from 'react-i18next';

const Favourites = ({navigation}) => {
const { t } = useTranslation();

    const { newsListing } = useContext(ApiContext);
    const [news, setNews] = useState([]);

    useEffect(() => {
        (async function () {
            const result = await newsListing();
            setNews(result);
        })();
    }, []);

    return (
        <View className="flex-1 bg-gray-300 space-y-5 w-full">
            <View>
                <Text className="font-bold text-3xl tracking-wider text-neutral-700 mt-4 mb-4 ml-6">{t('news')}</Text>
            </View>
            <NewsList navigation={navigation} news={news} />
        </View>
    );
};

export default Favourites;
