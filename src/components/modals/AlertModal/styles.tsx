import {StyleSheet} from 'react-native';

import APP_THEMES, {DEFAULT_THEME_KEYS, THEMES} from '~/assets/styles/Colors';
import {CustomFont, normalizeFont} from '~/assets/styles/CustomFonts';

const styles = (theme = THEMES.DEFAULT, color?: DEFAULT_THEME_KEYS) =>
    StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContainer: {
            marginHorizontal: 3,
            padding: 10,
            backgroundColor: APP_THEMES[theme].background,
            borderRadius: 25,
        },
        contentContainer: {
            justifyContent: 'space-between',
        },
        dataContainer: {
            borderBottomWidth: 1,
            borderBottomColor: APP_THEMES[theme].primaryBorderColor,
        },
        titleText: {
            ...CustomFont(theme).boldFont,
            color: color && APP_THEMES[theme][color],
            fontSize: normalizeFont(22),
            textAlign: 'center',
        },
        msgText: {
            ...CustomFont(theme).regularFont,
            color: APP_THEMES[theme].black,
            fontSize: normalizeFont(16),
            marginVertical: 8,
            textAlign: 'center',
        },
        rowContainer: {
            flexDirection: 'row',
            marginTop: 10,
        },
        btnContainer: {
            flex: 1,
        },
        buttonWrapper: {
            width: '50%',
            height: 45,
            alignSelf: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            backgroundColor: color && APP_THEMES[theme][color],
            marginTop: 10,
        },
        closeBtnText: {
            ...CustomFont(theme).boldFont,
            color: APP_THEMES[theme].buttonTextColor,
            fontSize: normalizeFont(16),
            textAlign: 'center',
        },
        btnConfirmText: {
            ...CustomFont(theme).boldFont,
            fontSize: normalizeFont(16),
            textAlign: 'center',
        },
        btnText: {
            ...CustomFont(theme).regularFont,
            fontSize: normalizeFont(16),
            textAlign: 'center',
        },
    });

export default styles;
