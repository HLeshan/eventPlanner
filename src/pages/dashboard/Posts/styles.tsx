import {StyleSheet} from 'react-native';

import {DEFAULT_APP_STYLES} from '~/assets/styles';
import APP_THEMES, {THEMES} from '~/assets/styles/Colors';
import {CustomFont, normalizeFont} from '~/assets/styles/CustomFonts';

const styles = (theme = THEMES.DEFAULT, isPostSelected = false) =>
    StyleSheet.create({
        headerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: DEFAULT_APP_STYLES.PADDING / 2,
            borderBottomColor: APP_THEMES[theme].primaryBorderColor,
            borderBottomWidth: 1,
        },
        headerDefault: {
            flex: 1,
        },
        undoIconContainer: {
            padding: 5,
        },
        undoIcon: {
            width: 15,
            height: 15,
            resizeMode: 'contain',
            tintColor: APP_THEMES[theme].quaternary,
        },
        headerTitle: {
            fontSize: normalizeFont(17),
            textAlign: 'center',
        },
        postSeparator: {
            borderBottomWidth: 1,
            borderBottomColor: APP_THEMES[theme].primaryBorderColor,
        },
        postWrapper: {
            padding: DEFAULT_APP_STYLES.PADDING / 2,
            backgroundColor: isPostSelected ? APP_THEMES[theme].secondary : APP_THEMES[theme].background,
        },
        postTitle: {
            ...CustomFont(theme).boldFont,
            fontSize: normalizeFont(16),
            color: APP_THEMES[theme].secondaryTextColor,
        },
        postSubtitle: {
            ...CustomFont(theme).regularFont,
            fontSize: normalizeFont(14),
            color: APP_THEMES[theme].darkGray,
            textAlign: 'justify',
        },
        postReadMore: {
            ...CustomFont(theme).boldFont,
            fontSize: normalizeFont(14),
            textAlign: 'right',
            padding: 5,
        },
        commentSection: {
            marginVertical: DEFAULT_APP_STYLES.PADDING / 2,
        },
        commentWrapper: {
            backgroundColor: APP_THEMES[theme].tertiary,
            marginLeft: DEFAULT_APP_STYLES.PADDING / 2,
            marginBottom: DEFAULT_APP_STYLES.PADDING,
            padding: 5,
            borderRadius: 5,
        },
        commentAuthorText: {
            ...CustomFont(theme).boldFont,
            fontSize: normalizeFont(14),
            color: APP_THEMES[theme].black,
            width: '40%',
        },
        commentBodyText: {
            ...CustomFont(theme).regularFont,
            fontSize: normalizeFont(12),
            color: APP_THEMES[theme].black,
        },
    });

export default styles;
