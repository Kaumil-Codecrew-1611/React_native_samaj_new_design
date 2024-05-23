import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Radio, Box } from 'native-base';

const SettingBottomSheet = ({ navigation, route }) => {
    const [language, setLanguage] = useState('');
    console.log(language)
    return (
        <View style={styles.container} className="flex-1 p-6 bg-indigo-50">
            <Radio.Group
                name="language"
                value={language}
                onChange={(nextValue) => {
                    setLanguage(nextValue);
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