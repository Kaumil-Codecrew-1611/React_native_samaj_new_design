import { createContext } from "react";
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

    const value = {
        progress,
        animatedProps, containerPath, curvedPaths, tHeight, circleXCoordinate, handleMoveCircle
    }
    return (
        <GlobalContext.Provider value={value}>{props.children}</GlobalContext.Provider>
    );
}