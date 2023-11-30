import React from 'react';
import {Text, View} from 'react-native';

import useAppSettings from '~/models/AppSettings';
import styles from './styles';

import type {TextProps, TextStyle, ViewStyle} from 'react-native';

interface Props extends TextProps {
    label: string;
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
}

const H2: React.FC<Props> = ({label, containerStyle, textStyle, ...props}) => {
    const theme = useAppSettings(state => state.theme);
    return (
        <View style={[styles(theme).wrapper, containerStyle]}>
            <Text style={[styles(theme).textBoxTitle, textStyle]} numberOfLines={2} {...props}>
                {label}
            </Text>
        </View>
    );
};

export default H2;
