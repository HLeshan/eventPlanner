import {StyleSheet} from 'react-native';
import APP_THEMES, {THEMES} from '~/assets/styles/Colors';

const styles = (theme: THEMES = THEMES.DEFAULT) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: APP_THEMES[theme].transparentOverlay,
            zIndex: 9999,
        },
    });

export default styles;
