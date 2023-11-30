import {PixelRatio, Platform, StyleSheet} from 'react-native';
import {DEVICE} from '~/utils/DeviceUtils';
import APP_THEMES, {THEMES} from './Colors';

export enum FONTS {
    Regular = 'Nunito-Regular',
    Medium = 'Nunito-Medium',
    Bold = 'Nunito-Bold',
    SemiBold = 'Nunito-SemiBold',
}

export const CustomFont = (theme: THEMES) =>
    StyleSheet.create({
        regularFont: {
            color: APP_THEMES[theme].primaryTextColor,
            fontFamily: FONTS.Regular,
            fontSize: normalizeFont(13),
        },
        mediumFont: {
            color: APP_THEMES[theme].primaryTextColor,
            fontFamily: FONTS.Medium,
            fontSize: normalizeFont(14),
        },
        boldFont: {
            color: APP_THEMES[theme].primaryTextColor,
            fontFamily: FONTS.Bold,
            fontSize: normalizeFont(14),
        },
    });

const scale = DEVICE.WIDTH / 360;

export function normalizeFont(size: number) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        if (Platform.isPad) {
            return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 10;
        } else {
            return Math.round(PixelRatio.roundToNearestPixel(newSize));
        }
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
}
