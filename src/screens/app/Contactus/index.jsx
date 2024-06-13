import { ScrollView } from 'native-base';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import ContactUsCard from '../../../components/ContactUsCard';

function ContactUs({ navigation }) {
    const { t } = useTranslation();
    const [highlight, setHighlight] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setHighlight(prev => !prev);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View className=" flex-1 bg-[#E9EDF7] space-y-5 w-full">
            <View className="bg-white p-3">
                <View className="flex flex-row justify-between items-center">
                    <Text className="text-2xl tracking-wider text-neutral-700 font-extrabold">
                        {t('contactUs')}
                    </Text>
                    <Pressable className="mr-6" style={styles.shadow} onPress={() => navigation.navigate("Support")}>
                        <View className={`p-[4px] rounded-full ${highlight ? 'bg-red-400' : 'bg-black'}`} style={styles.shadow}>
                            <View className={`w-[50px] h-[50px] rounded-full flex-row justify-center items-center ${highlight ? 'bg-blue-200' : 'bg-[#E9EDF7]'}`} style={styles.shadow}>
                                <Image className="w-[37px] h-[37px]" source={require('../../../assets/support.png')} />
                            </View>
                        </View>
                        <Text className="text-sm text-blue-500 font-medium tracking-widest" style={styles.textShadow} >Support</Text>
                    </Pressable>
                </View>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }} showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false} >
                <View className="bg-white p-2 mr-2 rounded-lg mx-4">
                    <Text className="tracking-wider text-neutral-700 px-3 text-justify">{t('contactusheading')}</Text>
                </View>
                <ContactUsCard />
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "black",
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 3,
    },
});

export default ContactUs;
