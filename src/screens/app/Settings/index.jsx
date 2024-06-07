import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Radio, Box } from 'native-base';
import i18n from '../../../context/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
const { t } = useTranslation();

const SettingBottomSheet = ({ navigation, route }) => {
    const [language, setLanguage] = useState('');

    const { t } = useTranslation();
    const successMessages = t('successchangeLanguage');
    console.log(successMessages, 'successMessages')

    const changeLanguage = async (selectedLanguage) => {
        setLanguage(selectedLanguage);
        await AsyncStorage.setItem('selectedLanguage', selectedLanguage);
        i18n.changeLanguage(selectedLanguage)
            .then(() => Alert.alert(successMessages))
            .catch((error) => {
                console.error('Error changing language:', error);
            });
    };

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