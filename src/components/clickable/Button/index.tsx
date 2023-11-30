import React from 'react';
import {Image, Text, View} from 'react-native';

import useAppSettings from '~/models/AppSettings';
import styles from './styles';
import Touchable from '../Touchable';

import type {ImageSourcePropType, TouchableWithoutFeedbackProps, ViewStyle} from 'react-native';

interface ButtonProps extends TouchableWithoutFeedbackProps {
    title: string;
    containerStyle?: ViewStyle;
    isSecondary?: boolean;
    disabled?: boolean;
    leftIcon?: ImageSourcePropType;
    rightIcon?: ImageSourcePropType;
}

const Button: React.FC<ButtonProps> = ({title, isSecondary = false, containerStyle, disabled = false, leftIcon, rightIcon, ...props}) => {
    const theme = useAppSettings(state => state.theme);
    return (
        <View style={[styles(theme, isSecondary, disabled).wrapper, containerStyle]}>
            <Touchable {...props} style={styles(theme, isSecondary, disabled).container} disabled={disabled}>
                {leftIcon && (
                    <View style={styles().iconWrapper}>
                        <Image source={leftIcon} style={styles(theme, isSecondary).iconStyle} />
                    </View>
                )}
                <Text style={styles(theme, isSecondary).textBoxTitle} numberOfLines={2}>
                    {title}
                </Text>
                {rightIcon && (
                    <View style={styles().iconWrapper}>
                        <Image source={rightIcon} style={styles(theme, isSecondary).iconStyle} />
                    </View>
                )}
            </Touchable>
        </View>
    );
};

export default Button;
