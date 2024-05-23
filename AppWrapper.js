import React from 'react';
import { GlobalProvider } from './src/context/globalState';
import App from './App';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WizardProvider } from './src/context/WizardProvider';

const AppWrapper = () => (
    <SafeAreaProvider>
        <GlobalProvider>
            <WizardProvider>
                <App />
            </WizardProvider>
        </GlobalProvider>
    </SafeAreaProvider>
);

export default AppWrapper;
