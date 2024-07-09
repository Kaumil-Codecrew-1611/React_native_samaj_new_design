import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ApiContext from "../../../context/ApiContext";
import NewsList from "./NewsList";
import { t } from "i18next";

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
        <View style={styles.container}>
            {/*  <View style={styles.header}>
                <Text className="text-2xl font-bold text-black">{t("news")}</Text>
            </View> */}
            <NewsList navigation={navigation} news={news} loading={loading} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 80
    },
    /* header: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    }, */
});

export default Favourites;