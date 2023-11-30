import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, View, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import APP_THEMES from '~/assets/styles/Colors';
import AlertModal from './components/modals/AlertModal';
import LoadingModal from './components/modals/LoadingModal';
import useAppSettings from './models/AppSettings';
import {RootNavigator} from '~/routes/RootNavigator';
import {onAuthStateChange} from './utils/FCMEvents';
import {navigationRef} from '~/utils/NavigationService';

function App(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const theme = useAppSettings(state => state.theme);

    useEffect(() => {
        const unsubscribe = onAuthStateChange();
        return () => {
            unsubscribe;
        };
    }, []);

    return (
        <>
            <View style={[styles.container, {backgroundColor: APP_THEMES[theme].background}]}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={APP_THEMES[theme].background} />
                <NavigationContainer ref={navigationRef}>
                    <RootNavigator />
                </NavigationContainer>
            </View>
            <AlertModal />
            <LoadingModal />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
