import AsyncStorage from '@react-native-async-storage/async-storage';
import { Box, Radio } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalContext } from '../../../context/globalState';
import i18n from '../../../context/i18n';
import toastMessage from '../../../utils/toastMessage';

const SettingBottomSheet = () => {

    const { defaultLanguage, setDefaultLanguage } = useContext(GlobalContext);
    const [language, setLanguage] = useState('');
    const [alertOpen, setAlertOpen] = useState(false)
    useEffect(() => {
        setLanguage(defaultLanguage)
    }, [])
    const { t } = useTranslation();
    const successMessages = t('successchangeLanguage');

    const changeLanguage = async (selectedLanguage) => {
        setLanguage(selectedLanguage);
        setAlertOpen(true);
    };
    const closeAlertModal = () => {
        setLanguage(defaultLanguage);
        setAlertOpen(false);
    }

    const AlertActionModal = async () => {
        await AsyncStorage.setItem('selectedLanguage', language);
        i18n.changeLanguage(language)
            .then(() => { setAlertOpen(false); setDefaultLanguage(language); })
            .catch((error) => {
                toastMessage('Something went wrong')
                console.error('Error changing language:', error);
            });

    }
    useEffect(() => {
        const getSelectedLanguage = async () => {
            try {
                const storedLanguage = await AsyncStorage.getItem('selectedLanguage');
                if (storedLanguage) {
                    await i18n.changeLanguage(storedLanguage)
                    setLanguage(storedLanguage);
                }
            } catch (error) {
                console.error('Error retrieving language:', error);
            }
        };

        getSelectedLanguage();
    }, []);

    return (
        <View style={styles.container} className="flex-1 p-6 bg-indigo-50">
            <Radio.Group
                name="language"
                value={language}
                onChange={(nextValue) => {
                    changeLanguage(nextValue);
                }}
                accessibilityLabel="Select Language"
            >
                <Box>
                    <Radio
                        value="gu"
                        ml={1}
                        my={1}
                        colorScheme="blue"
                        accessibilityLabel="Gujarati"
                    >
                        <Text className="text-lg text-neutral-700 tracking-wider font-bold">ગુજરાતી</Text>
                    </Radio>
                </Box>
                <Box>
                    <Radio
                        value="en"
                        ml={1}
                        my={1}
                        colorScheme="blue"
                        accessibilityLabel="English"
                    >
                        <Text className="text-lg text-neutral-700 tracking-wider font-bold">English</Text>
                    </Radio>
                </Box>
            </Radio.Group>
            <Modal
                transparent={true}
                visible={alertOpen}
                animationType="slideTop"
                onRequestClose={closeAlertModal}
            >
                <View className="flex-1 justify-top items-center">
                    {alertOpen && (
                        <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                    )}
                    <View className="w-4/5 bg-white rounded-[15px] p-4 shadow-lg mt-[90%]">
                        <Text className="font-bold text-lg text-black mb-4">{successMessages}</Text>
                        <View className="flex flex-row justify-between items-center">
                            <Pressable onPress={closeAlertModal} className="px-6 py-2 bg-red-500 rounded-[15px]">
                                <Text className="text-white">{t('cancel')}</Text>
                            </Pressable>
                            <Pressable onPress={AlertActionModal} className="px-6 py-2 bg-red-500 rounded-[15px]">
                                <Text className="text-white">{t('okay')}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default SettingBottomSheet;