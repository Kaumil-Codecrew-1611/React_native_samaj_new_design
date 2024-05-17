import React from "react";
import { Text, View } from "react-native";
import NewsList from "../../../components/News/NewsList";

const Favourites = () => {

    const news = [
        {
            id: 1,
            image: "https://www.tourmyindia.com/blog//wp-content/uploads/2020/11/Taj-Mahal-Agra-feature.jpg",
            title: "Test 1",
            name: "Meet",
            day: "15 May 2023",
            profile: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
        },
        {
            id: 2,
            image: "https://www.tourmyindia.com/blog//wp-content/uploads/2020/11/Taj-Mahal-Agra-feature.jpg",
            title: "Test 2",
            name: "Meet",
            day: "15 May 2023",
            profile: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
        },
        {
            id: 3,
            image: "https://www.tourmyindia.com/blog//wp-content/uploads/2020/11/Taj-Mahal-Agra-feature.jpg",
            title: "Test 3",
            name: "Meet",
            day: "15 May 2023",
            profile: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
        },
        {
            id: 4,
            image: "https://www.tourmyindia.com/blog//wp-content/uploads/2020/11/Taj-Mahal-Agra-feature.jpg",
            title: "Test 4",
            name: "Meet",
            day: "15 May 2023",
            profile: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
        },
        {
            id: 5,
            image: "https://www.tourmyindia.com/blog//wp-content/uploads/2020/11/Taj-Mahal-Agra-feature.jpg",
            title: "Test 5",
            name: "Meet",
            day: "15 May 2023",
            profile: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
        },
        {
            id: 6,
            image: "https://www.tourmyindia.com/blog//wp-content/uploads/2020/11/Taj-Mahal-Agra-feature.jpg",
            title: "Test 6",
            name: "Meet",
            day: "15 May 2023",
            profile: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
        },
        {
            id: 7,
            image: "https://www.tourmyindia.com/blog//wp-content/uploads/2020/11/Taj-Mahal-Agra-feature.jpg",
            title: "Test 7",
            name: "Meet",
            day: "15 May 2023",
            profile: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
        },
        {
            id: 8,
            image: "https://www.tourmyindia.com/blog//wp-content/uploads/2020/11/Taj-Mahal-Agra-feature.jpg",
            title: "Test 8",
            name: "Meet",
            day: "15 May 2023",
            profile: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
        },
        {
            id: 8,
            image: "https://www.tourmyindia.com/blog//wp-content/uploads/2020/11/Taj-Mahal-Agra-feature.jpg",
            title: "Test 8",
            name: "Meet",
            day: "15 May 2023",
            profile: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
        },

    ]

    return (
        <View className="flex-1 bg-gray-300 space-y-5 w-full">
            <View>
                <Text className="font-bold text-3xl tracking-wider text-neutral-700 mt-4 ml-6">News</Text>
            </View>
            <NewsList news={news} />
        </View>
    );
};

export default Favourites;
