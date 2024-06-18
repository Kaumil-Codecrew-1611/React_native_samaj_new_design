import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import ApiContext from "../../../context/ApiContext";
import NewsList from "./NewsList";

const Favourites = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const newsData = useContext(ApiContext);
    const [news, setNews] = useState([]);

    useEffect(() => {
        (async function () {
            const result = await newsData?.newsListing();
            setNews(result);
            setLoading(false)
        })();
    }, []);

    return (
        <View className="flex-1 bg-white w-full font-bold text-3xl tracking-wider text-neutral-700">
            <NewsList navigation={navigation} news={news} loading={loading} />
        </View>
    );
};

export default Favourites;