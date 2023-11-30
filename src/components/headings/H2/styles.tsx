import {StyleSheet} from 'react-native';

import {DEFAULT_APP_STYLES} from '~/assets/styles';
import APP_THEMES, {THEMES} from '~/assets/styles/Colors';
import {CustomFont, normalizeFont} from '~/assets/styles/CustomFonts';

const styles = (theme = THEMES.DEFAULT) =>
    StyleSheet.create({
        wrapper: {
            marginBottom: DEFAULT_APP_STYLES.PADDING,
        },
        textBoxTitle: {
            ...CustomFont(theme).mediumFont,
            fontSize: normalizeFont(14),
            color: APP_THEMES[theme].darkGray,
        },
    });
export default styles;
