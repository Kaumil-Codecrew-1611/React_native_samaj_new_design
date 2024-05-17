import { createContext, useCallback, useMemo, useRef, useState } from "react";
import { runOnJS, useAnimatedProps, useSharedValue } from "react-native-reanimated";
import { interpolatePath } from 'react-native-redash';
import usePath from "../hooks/usePath";
import { getPathXCenter } from "../utils/path";
export const GlobalContext = createContext({});

export const GlobalProvider = (props) => {
    const progress = useSharedValue(1);
    const { containerPath, curvedPaths, tHeight } = usePath();
    const circleXCoordinate = useSharedValue(0);

    const handleMoveCircle = (currentPath) => {
        circleXCoordinate.value = getPathXCenter(currentPath);
    };
    const animatedProps = useAnimatedProps(() => {
        const currentPath = interpolatePath(
            progress.value,
            Array.from({ length: curvedPaths.length }, (_, index) => index + 1),
            curvedPaths,
        );
        runOnJS(handleMoveCircle)(currentPath);
        return {
            d: `${containerPath} ${currentPath}`,
        };
    });

    const [SelectedVillage, setSelectedVillage] = useState("");
    /***
     *  created for bottom sheet
     *  */
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

    const bottomSheetRef = useRef(null);

    // Memoize the bottom sheet snapPoints
    const snapPoints = useMemo(() => ['30%', '34%'], []);

    // Callback to handle bottom sheet visibility
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
        if (index === -1) {
            setIsBottomSheetVisible(false);
        }
    }, []);

    // Callback to open the bottom sheet
    const NavigateSettingScreen = () => {
        setIsBottomSheetVisible(true);
    };

    /***
     *  ------ end bottom sheet
     *  */


    const value = {
        progress,
        animatedProps,
        containerPath,
        curvedPaths,
        tHeight,
        circleXCoordinate,
        handleMoveCircle,
        SelectedVillage,
        setSelectedVillage
    }
    return (
        <GlobalContext.Provider value={value}>{props.children}</GlobalContext.Provider>
    );
}