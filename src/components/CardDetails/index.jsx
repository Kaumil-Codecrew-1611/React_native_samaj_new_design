import {
    BackdropBlur,
    Canvas,
    Fill,
    Image,
    useImage
} from "@shopify/react-native-skia";
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { GlobalContext } from "../../context/globalState";
import { withTiming } from "react-native-reanimated";

const CardDetails = ({ content, size, thumbnail, redirectTo, navigation, idx }) => {
    const { progress } = useContext(GlobalContext)
    const image = useImage(thumbnail || 'https://img.freepik.com/free-photo/eiffel-tower-paris-with-gorgeous-colors-autumn_268835-828.jpg');
    const small = (size == 'sm')
    const large = (size == 'lg')
    const full = (size == 'full')

    const redirect = () => {
        if (redirectTo) {
            navigation.navigate(redirectTo);
            progress.value = withTiming(idx);
        }
    }
    return (
        <>{content &&
            <TouchableOpacity onPress={redirect} activeOpacity={0.85} className={`${small ? "w-28" : large ? "w-40" : full ?
                "w-full" : "w-32"} overflow-hidden rounded-2xl shadow-lg shadow-black m-2 mb-5`}>
                <View classname="relative">
                    <Canvas style={{ width: small ? 256 : large ? 300 : full ? 330 : 156, height: small ? 150 : large ? 230 : full ? 500 : 180 }}>
                        <Image image={image} x={0} y={0} width={small ? 112 : large ? 160 : full ? 330 : 130} height={small ? 170 : large ? 250 : full ? 500 : 190} fit="cover" />
                        <BackdropBlur blur={2} clip={
                            {
                                x: 0,
                                y: (small ? 90 : large ? 150 : full ? 380 : 120),
                                width: (full ? 350 : 256), height: 120
                            }}>
                            <Fill color="rgba(200, 200, 200, 0.2)" />
                        </BackdropBlur>
                    </Canvas>
                    <View className="bottom-0 p-2 absolute w-full">
                        <Text className={`${small ? 'h-12 text-xl text-center' : large ? 'h-16 text-2xl' : full ? 'h-24 text-4xl' : 'h-12 text-2xl'} font-bold text-white`}>
                            {content}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity >}
        </>
    )
}
const styles = StyleSheet.create({
    stretch: {
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        height: 200,
    },

})
export default CardDetails