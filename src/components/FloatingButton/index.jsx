// components/FloatingButton.js
import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, View } from 'react-native';
import { GlobalContext } from '../../context/globalState';
import SettingBottomSheet from '../../screens/app/Settings';

const ChangeLanguage = () => {
    const { setScreenpercentage, openBottomSheet } = useContext(GlobalContext);
    const openSettings = () => {
        setScreenpercentage({ first: "30%", second: "34%" });
        openBottomSheet(<SettingBottomSheet />);
    };
    return (
        <TouchableOpacity style={styles.button} onPress={() => openSettings()}>
            <View className="h-10 w-10">
                <Image className="h-10 w-full object-cover scale-[1.7]" source={require('../../assets/setting.jpg')} ></Image>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 80,
        right: 10,
        zIndex: 0,
        overflow: 'hidden',
    },
});

export default ChangeLanguage;

