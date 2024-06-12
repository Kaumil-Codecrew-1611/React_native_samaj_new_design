import { View, Text, Keyboard } from 'react-native';
import React, { useEffect, useContext, useCallback } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { GlobalContext } from '../../context/globalState';
import { useFocusEffect } from '@react-navigation/native';

const CustomBottomSheet = ({ screenFirstPercentage, screenSecondPercentage }) => {
    const { isBottomSheetVisible, handleSheetChanges, bottomSheetRef, setScreenpercentage, snapPoints, bottomSheetContent, setIsBottomSheetVisible } = useContext(GlobalContext);

    useEffect(() => {
        setScreenpercentage({
            first: screenFirstPercentage,
            second: screenSecondPercentage
        });
    }, []);

    const handleCloseBottomSheet = () => {
        // Dismiss the keyboard when the bottom sheet is closed
        Keyboard.dismiss();
    };
    useFocusEffect(
        useCallback(() => {
            return () => {
                setIsBottomSheetVisible(false);
            };
        }, []))

    return (
        <BottomSheet
            aria-label='Setting Bottom Sheet'
            ref={bottomSheetRef}
            index={isBottomSheetVisible ? 0 : -1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose
            detached={true}
            onClose={handleCloseBottomSheet}
        >
            {bottomSheetContent}
        </BottomSheet>
    );
};

export default CustomBottomSheet;
