import {Platform} from 'react-native';
import {getApiLevel} from 'react-native-device-info';
import {check, request, PERMISSIONS, RESULTS, requestNotifications, openSettings} from 'react-native-permissions';

import {logInfo} from './Logger';

import type {Permission as PermissionType} from 'react-native-permissions';

const PLATFORM_NOTIFICATION_PERMISSION = {
    android: PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
};

export const REQUEST_PERMISSION_TYPE: {[key in PERMISSION_TYPE]: any} = {
    notification: PLATFORM_NOTIFICATION_PERMISSION,
};

enum PERMISSION_TYPE {
    notification = 'notification',
}

class AppPermission {
    checkPermission = async (type: PERMISSION_TYPE) => {
        const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
        logInfo('AppPermission checkPermission permissions', permissions);

        if (!permissions) {
            return true;
        }

        try {
            const result = await check(permissions);
            logInfo('AppPermission checkPermission result', result);
            if (result === RESULTS.GRANTED) {
                return true;
            }

            const requestResult = await this.requestPermission(permissions);
            logInfo('AppPermission checkPermission requestResult', requestResult);

            if (!requestResult) {
                openSettings().catch(() => logInfo('cannot open settings'));
            }

            return requestResult;
        } catch (error) {
            logInfo('AppPermission checkPermission error', error);
            return false;
        }
    };

    requestPermission = async (permissions: PermissionType) => {
        logInfo('AppPermission requestPermission permissions', permissions);

        try {
            const result = await request(permissions);
            logInfo('AppPermission requestPermission result', result);

            return result === RESULTS.GRANTED;
        } catch (error) {
            logInfo('AppPermission requestPermission error', error);
            return false;
        }
    };

    requestNotificationPermission = async () => {
        if (Platform.OS === 'ios') {
            const {status, settings} = await requestNotifications(['alert', 'sound', 'badge']);
            logInfo('AppPermission requestNotificationPermission status, settings', status, settings);

            return status === RESULTS.GRANTED;
        } else {
            const apiLevel = await getApiLevel();
            if (apiLevel > 32) {
                this.checkPermission(PERMISSION_TYPE.notification);
            }

            return true;
        }
    };
}

const Permission = new AppPermission();
export {Permission, PERMISSION_TYPE};
