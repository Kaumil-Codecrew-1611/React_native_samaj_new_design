import { View, Text } from 'react-native'
import React from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
const CustomBottomSheet = () => {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['30%', '34%'], []);
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
        if (index === -1) {
            setIsBottomSheetVisible(false);
        }
    }, []);
    return (
        <BottomSheet
            aria-label='Setting Bottom Sheet'
            ref={bottomSheetRef}
            index={isBottomSheetVisible ? 0 : -1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose
            detached={true}
        >
            <SettingBottomSheet />
        </BottomSheet>
    )
}

export default CustomBottomSheet