import {StyleSheet} from 'react-native';
import {DEFAULT_APP_STYLES} from '~/assets/styles';
import APP_THEMES, {THEMES} from '~/assets/styles/Colors';
import {normalizeFont} from '~/assets/styles/CustomFonts';

const styles = (theme = THEMES.DEFAULT) =>
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
        headerProfileImage: {
            width: 44,
            height: 44,
            borderRadius: 22,
            resizeMode: 'contain',
        },
        headerTitle: {
            fontSize: normalizeFont(17),
            textAlign: 'center',
        },
        formContainer: {
            marginBottom: 50,
        },
        profileImageContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: DEFAULT_APP_STYLES.PADDING,
        },
        profileImage: {
            width: 116,
            height: 116,
            borderRadius: 58,
            resizeMode: 'contain',
        },
        cameraIcon: {
            position: 'absolute',
            width: 24,
            height: 24,
            resizeMode: 'contain',
            tintColor: APP_THEMES[theme].buttonTextColor,
        },
    });

export default styles;
