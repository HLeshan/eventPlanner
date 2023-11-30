import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import APP_THEMES from '~/assets/styles/Colors';
import useAppSettings from '~/models/AppSettings';
import useModalControllers from '~/models/ModalControllers';
import styles from './styles';

export default function LoadingModal() {
    const theme = useAppSettings(state => state.theme);
    const isLoading = useModalControllers(state => state.loading) > 0;
    return (
        <>
            {isLoading && (
                <View style={styles(theme).container}>
                    <ActivityIndicator size={'large'} color={APP_THEMES[theme].primary} />
                </View>
            )}
        </>
    );
}
