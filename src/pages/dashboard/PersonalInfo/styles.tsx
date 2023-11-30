import {StyleSheet} from 'react-native';
import {DEFAULT_APP_STYLES} from '~/assets/styles';
import {normalizeFont} from '~/assets/styles/CustomFonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: DEFAULT_APP_STYLES.PADDING,
    },
    formContainer: {
        flex: 1,
    },
    headingText: {
        fontSize: normalizeFont(19),
        marginBottom: 0,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        marginVertical: DEFAULT_APP_STYLES.PADDING * 2,
    },
    buttonWrapper: {
        flex: 1,
    },
});

export default styles;
