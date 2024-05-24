import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { runOnJS, useAnimatedProps, useSharedValue } from "react-native-reanimated";
import { interpolatePath } from 'react-native-redash';
import usePath from "../hooks/usePath";
import { getPathXCenter } from "../utils/path";
import { Keyboard } from 'react-native';
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
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [screenpercentage, setScreenpercentage] = useState({
        first: "",
        second: ""
    });
    const bottomSheetRef = useRef(null);
    const [bottomSheetContent, setBottomSheetContent] = useState(null);
    const [registerData, setRegisterData] = useState(null);

    const snapPoints = useMemo(() => {
        const firstPoint = screenpercentage.first || "25%";
        const secondPoint = screenpercentage.second || "50%";
        return [firstPoint, secondPoint];
    }, [screenpercentage]);

    const handleSheetChanges = useCallback((index) => {

        if (index === -1) {
            setIsBottomSheetVisible(false);
        }
    }, []);

    const openBottomSheet = (content) => {
        setBottomSheetContent(content);
        setIsBottomSheetVisible(true);
    };

    const [isAuthScreenActive, setIsAuthScreenActive] = useState(false);

    const value = {
        progress,
        animatedProps,
        containerPath,
        curvedPaths,
        tHeight,
        circleXCoordinate,
        handleMoveCircle,
        SelectedVillage,
        setSelectedVillage,
        isBottomSheetVisible,
        setIsBottomSheetVisible,
        setScreenpercentage,
        screenpercentage,
        bottomSheetRef,
        snapPoints,
        handleSheetChanges,
        openBottomSheet,
        bottomSheetContent,
        setIsAuthScreenActive,
        isAuthScreenActive,
        setRegisterData,
        registerData

    };

    return (
        <GlobalContext.Provider value={value}>{props.children}</GlobalContext.Provider>
    );
};
