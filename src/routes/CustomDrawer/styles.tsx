import {StyleSheet} from 'react-native';

import {DEFAULT_APP_STYLES} from '~/assets/styles';
import APP_THEMES, {THEMES} from '~/assets/styles/Colors';
import {CustomFont, normalizeFont} from '~/assets/styles/CustomFonts';

const styles = (theme = THEMES.DEFAULT) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
        headerContainer: {
            flexDirection: 'row',
            padding: DEFAULT_APP_STYLES.PADDING / 2,
            borderBottomColor: APP_THEMES[theme].primaryBorderColor,
            borderBottomWidth: 1,
        },
        profileImage: {
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: DEFAULT_APP_STYLES.PADDING / 2,
        },
        headerText: {
            ...CustomFont(theme).mediumFont,
            fontSize: normalizeFont(16),
            color: APP_THEMES[theme].secondaryTextColor,
        },
        subHeaderText: {
            ...CustomFont(theme).mediumFont,
            fontSize: normalizeFont(14),
            color: APP_THEMES[theme].darkGray,
        },
        drawerContentContainer: {
            flex: 1,
            padding: DEFAULT_APP_STYLES.PADDING,
        },
        drawerItemWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            gap: 10,
        },
        drawerItemIcon: {
            width: 14,
            height: 14,
            resizeMode: 'contain',
            tintColor: APP_THEMES[theme].primary,
        },
        drawerItemText: {
            ...CustomFont(theme).boldFont,
            fontSize: normalizeFont(14),
            color: APP_THEMES[theme].primary,
        },
        appVersionText: {
            ...CustomFont(theme).mediumFont,
            fontSize: normalizeFont(14),
            color: APP_THEMES[theme].darkGray,
            textAlign: 'center',
            padding: 10,
        },
    });

export default styles;
