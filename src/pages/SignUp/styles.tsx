import {StyleSheet} from 'react-native';
import {DEFAULT_APP_STYLES} from '~/assets/styles';

const styles = StyleSheet.create({
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
    buttonContainer: {
        marginVertical: DEFAULT_APP_STYLES.PADDING * 2,
    },
});

export default styles;
