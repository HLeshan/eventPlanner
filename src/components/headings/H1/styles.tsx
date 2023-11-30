import {StyleSheet} from 'react-native';

import {DEFAULT_APP_STYLES} from '~/assets/styles';
import APP_THEMES, {THEMES} from '~/assets/styles/Colors';
import {CustomFont, normalizeFont} from '~/assets/styles/CustomFonts';

const styles = (theme = THEMES.DEFAULT) =>
    StyleSheet.create({
        wrapper: {
            marginVertical: DEFAULT_APP_STYLES.PADDING / 2,
        },
        textBoxTitle: {
            ...CustomFont(theme).boldFont,
            fontSize: normalizeFont(32),
            color: APP_THEMES[theme].secondaryTextColor,
        },
    });
export default styles;
