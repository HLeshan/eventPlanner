import {Platform, StyleSheet} from 'react-native';

import {DEFAULT_APP_STYLES} from '~/assets/styles';
import APP_THEMES, {THEMES} from '~/assets/styles/Colors';
import {CustomFont, normalizeFont} from '~/assets/styles/CustomFonts';

const styles = (theme = THEMES.DEFAULT, isSecondary?: boolean, disabled?: boolean) =>
    StyleSheet.create({
        wrapper: {
            ...Platform.select({
                ios: {
                    zIndex: -1,
                },
            }),
            marginTop: DEFAULT_APP_STYLES.PADDING,
            // marginBottom: DEFAULT_APP_STYLES.PADDING * 2,
        },
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            height: 44,
            alignItems: 'center',
            borderRadius: 2,
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: disabled ? APP_THEMES[theme].disabled : isSecondary ? APP_THEMES[theme].secondary : APP_THEMES[theme].primary,
        },
        iconWrapper: {
            padding: 1,
        },
        iconStyle: {
            width: 15,
            height: 15,
            resizeMode: 'contain',
            tintColor: isSecondary ? APP_THEMES[theme].secondaryTextColor : APP_THEMES[theme].buttonTextColor,
        },
        textBoxTitle: {
            ...CustomFont(theme).boldFont,
            fontSize: normalizeFont(14),
            color: isSecondary ? APP_THEMES[theme].secondaryTextColor : APP_THEMES[theme].buttonTextColor,
            paddingHorizontal: 10,
        },
    });
export default styles;
