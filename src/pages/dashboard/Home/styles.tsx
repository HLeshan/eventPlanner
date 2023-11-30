import {StyleSheet} from 'react-native';
import {DEFAULT_APP_STYLES} from '~/assets/styles';

import APP_THEMES, {THEMES} from '~/assets/styles/Colors';
import {CustomFont, normalizeFont} from '~/assets/styles/CustomFonts';
import {DEVICE} from '~/utils/DeviceUtils';

const styles = (theme = THEMES.DEFAULT) =>
    StyleSheet.create({
        pageContainer: {
            flexGrow: 1,
            paddingBottom: DEFAULT_APP_STYLES.PADDING * 2,
            backgroundColor: APP_THEMES[theme].background,
        },
        carouselLoadingWrapper: {
            height: 200,
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderBottomColor: APP_THEMES[theme].primaryBorderColor,
        },
        loadingIndicator: {
            height: 100,
        },
        bannerContainer: {
            flex: 1,
            justifyContent: 'center',
        },
        bannerImage: {
            width: '100%',
            height: '100%',
        },
        bannerCount: {
            position: 'absolute',
            bottom: 16,
            right: 16,
            padding: 5,
            borderRadius: 5,
            backgroundColor: APP_THEMES[theme].background,
        },
        eventSection: {
            paddingHorizontal: DEFAULT_APP_STYLES.PADDING,
            borderBottomWidth: 1,
            borderBottomColor: APP_THEMES[theme].primaryBorderColor,
        },
        eventTitle: {
            fontSize: normalizeFont(26),
        },
        eventDescription: {
            fontSize: normalizeFont(14),
        },
        subtitle: {
            fontSize: normalizeFont(22),
        },
        orgSeparator: {
            borderBottomWidth: 1,
            borderBottomColor: APP_THEMES[theme].primaryBorderColor,
        },
        orgItemWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 16,
        },
        orgItemImage: {
            width: 44,
            height: 44,
            borderRadius: 22,
        },
        orgItemTextWrapper: {
            flex: 1,
            marginHorizontal: 10,
            gap: 5,
        },
        orgItemTitle: {
            ...CustomFont(theme).mediumFont,
            fontSize: normalizeFont(16),
            color: APP_THEMES[theme].secondaryTextColor,
        },
        orgItemSubtitle: {
            ...CustomFont(theme).regularFont,
            color: APP_THEMES[theme].darkGray,
        },
        orgItemIcon: {
            width: 24,
            height: 24,
            tintColor: APP_THEMES[theme].secondaryTextColor,
        },
        photoSection: {
            borderBottomWidth: 1,
            borderBottomColor: APP_THEMES[theme].primaryBorderColor,
        },
        photoTitleWrapper: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: DEFAULT_APP_STYLES.PADDING,
            paddingTop: 16,
        },
        allPhotosWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
        },
        allPhotosText: {
            ...CustomFont(theme).boldFont,
            fontSize: normalizeFont(14),
            color: APP_THEMES[theme].primary,
        },
        allPhotosIcon: {
            width: 16,
            height: 16,
            tintColor: APP_THEMES[theme].primary,
            marginHorizontal: 5,
        },
        photoItemContainer: {
            paddingHorizontal: DEFAULT_APP_STYLES.PADDING,
        },
        photoItemWrapper: {
            width: DEVICE.WIDTH * 0.65,
            height: DEVICE.HEIGHT * 0.4,
        },
        photosItemImage: {
            width: '100%',
            height: '50%',
            resizeMode: 'cover',
        },
        photoItemTextWrapper: {
            flex: 1,
            padding: DEFAULT_APP_STYLES.PADDING,
            gap: 16,
            borderColor: APP_THEMES[theme].quinary,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderTopWidth: 1,
        },
        photoItemTitle: {
            fontWeight: '700',
            fontSize: normalizeFont(16),
            color: APP_THEMES[theme].secondaryTextColor,
        },
        photoItemSubtitle: {
            ...CustomFont(theme).regularFont,
            color: APP_THEMES[theme].darkGray,
        },
        postsSection: {
            padding: DEFAULT_APP_STYLES.PADDING,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: APP_THEMES[theme].primaryBorderColor,
        },
        postCountText: {
            ...CustomFont(theme).boldFont,
            fontSize: normalizeFont(19),
            color: APP_THEMES[theme].primary,
        },
        postsText: {
            ...CustomFont(theme).mediumFont,
            fontSize: normalizeFont(13),
            color: APP_THEMES[theme].secondaryTextColor,
        },
    });

export default styles;
