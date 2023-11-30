import React, {useState} from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import {Field} from 'react-final-form';

import ShowPassword from '~/assets/images/icons/view.png';
import HidePassword from '~/assets/images/icons/hide.png';
import APP_THEMES from '~/assets/styles/Colors';
import Touchable from '~/components/clickable/Touchable';
import useAppSettings from '~/models/AppSettings';
import styles from './styles';

import type {TextInputProps, ImageSourcePropType} from 'react-native';
import type {FieldRenderProps} from 'react-final-form';

interface TextFieldProps extends TextInputProps {
    label?: string;
    leftIcon?: ImageSourcePropType;
    placeholder?: string;
    password?: boolean;
    numberOfLines?: number;
}

interface Props extends TextFieldProps {
    name: string;
    validate?: any;
    [propName: string]: any;
}

interface InputBoxProps extends FieldRenderProps<string, TextFieldProps> {}

const InputBox = ({name, label, leftIcon, placeholder, password, numberOfLines, editable = true, meta, ...props}: InputBoxProps) => {
    const theme = useAppSettings(state => state.theme);
    const [isPassword, setPassword] = useState(password);

    const errorVisible = meta?.invalid && meta?.touched;
    return (
        <View style={styles(theme).wrapper}>
            {label && <Text style={styles(theme).textBoxTitle}>{label}</Text>}
            <View style={styles().row}>
                <View style={styles().itemContainer}>
                    {leftIcon && (
                        <View style={styles().leftIconWrapper}>
                            <Image source={leftIcon} style={styles(theme).leftIcon} />
                        </View>
                    )}
                    <TextInput
                        secureTextEntry={isPassword}
                        {...props}
                        accessibilityLabel={'textBox/' + name}
                        testID={'textBox/' + name}
                        placeholder={placeholder && placeholder}
                        placeholderTextColor={APP_THEMES[theme].placeHolderTextColor}
                        multiline={numberOfLines && numberOfLines > 1}
                        numberOfLines={numberOfLines}
                        editable={editable}
                        style={[styles(theme, errorVisible, numberOfLines, editable).textInput, leftIcon && styles().textInputLightIcon]}
                    />
                    {password && (
                        <Touchable style={styles().passwordIconWrapper} onPress={() => setPassword(!isPassword)}>
                            {isPassword ? (
                                <Image source={ShowPassword} style={styles(theme).passwordIcon} />
                            ) : (
                                <Image source={HidePassword} style={styles(theme).passwordIcon} />
                            )}
                        </Touchable>
                    )}
                </View>
            </View>
            {errorVisible && <Text style={styles(theme).errorMsg}>{meta.error}</Text>}
        </View>
    );
};

const TextInputField = ({name, validate, parse, ...props}: Props) => (
    <Field name={name} validate={validate} parse={parse}>
        {({input, meta}) => <InputBox input={input} {...props} {...input} meta={meta} />}
    </Field>
);

export default TextInputField;
