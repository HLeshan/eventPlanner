import {StyleSheet} from 'react-native';
import APP_THEMES, {THEMES} from '~/assets/styles/Colors';
import {DEFAULT_APP_STYLES} from '~/assets/styles';

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
        subtitleText: {
            textAlign: 'center',
            marginBottom: DEFAULT_APP_STYLES.PADDING,
        },
        subTitleWrapper: {
            marginBottom: 0,
        },
        imageUploadContainer: {
            width: 116,
            height: 116,
            borderRadius: 58,
            backgroundColor: APP_THEMES[theme].secondary,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
        },
        cameraIcon: {
            width: 24,
            height: 24,
            resizeMode: 'contain',
            tintColor: APP_THEMES[theme].primary,
        },
        profileImage: {
            width: 116,
            height: 116,
            borderRadius: 58,
            resizeMode: 'contain',
            alignSelf: 'center',
        },
        buttonContainer: {
            marginVertical: DEFAULT_APP_STYLES.PADDING * 2,
        },
    });

export default styles;
