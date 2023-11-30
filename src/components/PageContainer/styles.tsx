import {StyleSheet} from 'react-native';

import {DEFAULT_APP_STYLES} from '~/assets/styles';
import APP_THEMES, {THEMES} from '~/assets/styles/Colors';

const styles = (theme: THEMES, removePadding?: boolean) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: APP_THEMES[theme].background,
        },
        wrapper: {
            flexGrow: 1,
            paddingBottom: DEFAULT_APP_STYLES.PADDING,
            paddingHorizontal: removePadding ? DEFAULT_APP_STYLES.PADDING / 2 : DEFAULT_APP_STYLES.PADDING,
            backgroundColor: APP_THEMES[theme].background,
        },
    });

export default styles;
