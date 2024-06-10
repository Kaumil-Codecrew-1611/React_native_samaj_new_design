import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert, Modal, Pressable } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Radio, Box } from 'native-base';
import i18n from '../../../context/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const SettingBottomSheet = ({ navigation, route }) => {
    const [language, setLanguage] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertOpen, setAlertOpen] = useState(false)

    const { t } = useTranslation();
    const successMessages = t('successchangeLanguage');

    const changeLanguage = async (selectedLanguage) => {
        setLanguage(selectedLanguage);
        await AsyncStorage.setItem('selectedLanguage', selectedLanguage);
        i18n.changeLanguage(selectedLanguage)
            .then(() => { setAlertMessage(successMessages); setAlertOpen(true); })
            .catch((error) => {
                console.error('Error changing language:', error);
            });
    };
    const closeAlertModal = () => {
        setAlertOpen(false);
        setAlertMessage("");
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
                        <Text className="font-bold text-lg mb-4">{alertMessage}</Text>
                        <View className="flex-row justify-end items-center">
                            <Pressable onPress={closeAlertModal} className="px-6 py-2 bg-red-500 rounded-[15px]">
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