import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View} from 'react-native';

import useAppSettings from '~/models/AppSettings';
import styles from './styles';

import type {ReactNode} from 'react';
import type {ScrollViewProps} from 'react-native';

interface ContainerProps extends ScrollViewProps {
    scrollDisabled?: boolean;
    removePadding?: boolean;
    children: ReactNode;
}

const PageContainer = ({children, scrollDisabled = false, removePadding = false, ...props}: ContainerProps) => {
    const theme = useAppSettings(state => state.theme);
    return (
        <SafeAreaView style={styles(theme).container}>
            <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles(theme, removePadding).wrapper}>
                {!scrollDisabled ? (
                    <ScrollView {...props} scrollEventThrottle={16} bounces={false} keyboardShouldPersistTaps={'handled'}>
                        {children}
                    </ScrollView>
                ) : (
                    <View {...props}>{children}</View>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default PageContainer;
