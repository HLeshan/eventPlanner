import {StyleSheet} from 'react-native';
import APP_THEMES, {THEMES} from '~/assets/styles/Colors';
import {DEFAULT_APP_STYLES} from '~/assets/styles';
import {CustomFont, normalizeFont} from '~/assets/styles/CustomFonts';

const styles = (theme = THEMES.DEFAULT) =>
    StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: DEFAULT_APP_STYLES.PADDING,
        },
        formContainer: {
            flex: 1,
            justifyContent: 'center',
        },
        titleContainer: {
            alignItems: 'center',
        },
        restorePwContainer: {
            flexDirection: 'row',
            alignSelf: 'flex-end',
        },
        restoreText: {
            ...CustomFont(theme).boldFont,
            fontSize: normalizeFont(14),
            color: APP_THEMES[theme].primary,
        },
        restoreIcon: {
            width: 20,
            height: 20,
            tintColor: APP_THEMES[theme].primary,
            marginHorizontal: 5,
        },
        buttonContainer: {
            marginVertical: DEFAULT_APP_STYLES.PADDING * 2,
        },
    });

export default styles;
