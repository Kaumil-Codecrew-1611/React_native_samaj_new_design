import { View, Text, Keyboard } from 'react-native';
import React, { useEffect, useContext } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { GlobalContext } from '../../context/globalState';

const CustomBottomSheet = ({ screenFirstPercentage, screenSecondPercentage }) => {
    const { isBottomSheetVisible, handleSheetChanges, bottomSheetRef, setScreenpercentage, snapPoints, bottomSheetContent } = useContext(GlobalContext);

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
