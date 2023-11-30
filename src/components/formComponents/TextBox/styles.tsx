import {Platform, StyleSheet} from 'react-native';

import APP_THEMES, {THEMES} from '~/assets/styles/Colors';
import {CustomFont, normalizeFont} from '~/assets/styles/CustomFonts';

const styles = (theme = THEMES.DEFAULT, errorVisible?: boolean, numberOfLines?: number, editable?: boolean) =>
    StyleSheet.create({
        wrapper: {
            marginVertical: 5,
            ...Platform.select({
                ios: {
                    zIndex: -1,
                },
            }),
        },
        textBoxTitle: {
            ...CustomFont(theme).mediumFont,
            color: APP_THEMES[theme].secondaryTextColor,
            marginBottom: 5,
            marginLeft: 8,
        },
        leftIconWrapper: {
            position: 'absolute',
            left: 5,
            top: 7,
            zIndex: 99,
            padding: 5,
        },
        leftIcon: {
            width: 20,
            height: 20,
            resizeMode: 'contain',
            tintColor: APP_THEMES[theme].quaternary,
        },
        textInput: {
            borderBottomColor: errorVisible ? APP_THEMES[theme].error : APP_THEMES[theme].primaryBorderColor,
            borderBottomWidth: 1,
            paddingHorizontal: 20,
            marginBottom: errorVisible ? 0 : normalizeFont(16),
            minHeight: numberOfLines ? numberOfLines * 25 : 45,
            height: normalizeFont(42),
            color: APP_THEMES[theme].secondaryTextColor,
            width: '100%',
            backgroundColor: !editable ? APP_THEMES[theme].disabled : APP_THEMES[theme].secondary,
            fontSize: normalizeFont(13),
            textAlignVertical: numberOfLines ? 'top' : 'center',
        },
        textInputLightIcon: {
            paddingLeft: 45,
        },
        errorMsg: {
            textAlign: 'right',
            ...CustomFont(theme).regularFont,
            fontSize: normalizeFont(10),
            paddingRight: 5,
            color: APP_THEMES[theme].error,
        },
        itemContainer: {
            flexDirection: 'row',
            flex: 1,
        },
        passwordIconWrapper: {
            position: 'absolute',
            right: 5,
            top: 7,
            padding: 5,
        },
        passwordIcon: {
            width: 25,
            height: 25,
            tintColor: APP_THEMES[theme].quaternary,
        },
        row: {
            flexDirection: 'row',
        },
    });
export default styles;
