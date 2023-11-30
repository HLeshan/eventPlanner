import {Platform} from 'react-native';
import messaging, {type FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {isEmulatorSync} from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {isDEV_, APP_SETTINGS, STORAGE_KEYS} from '~/constants';
import {logInfo} from './Logger';
import {Permission} from './PermissionHandler';

// Maintaining separate js file in case the application needed to release in Huawei store

/*
 * Notification Events
 */

export function subscribeToTopic(topic: string) {
    let topicString;

    if (isDEV_) {
        topicString = 'TEST_' + topic;
    } else {
        topicString = topic;
    }

    messaging().subscribeToTopic(topicString);
}

export async function checkNotificationPermission() {
    const authStatus = await Permission.requestNotificationPermission();
    logInfo('Authorization status:', authStatus);

    if (authStatus) {
        return true;
    }
    return false;
}

export async function getNotificationToken() {
    let fcmToken = await AsyncStorage.getItem(STORAGE_KEYS.FCM_TOKEN);

    subscribeToTopic(APP_SETTINGS.DEFAULT_CHANNEL);

    if (!fcmToken) {
        if (Platform.OS === 'ios' && isEmulatorSync()) {
            await messaging().setAPNSToken('test');
        }

        fcmToken = await getToken();

        if (fcmToken) {
            await AsyncStorage.setItem(STORAGE_KEYS.FCM_TOKEN, fcmToken);
        }
    }
    logInfo('token: ' + fcmToken);
}

export async function getToken() {
    if (Platform.OS === 'ios' && isEmulatorSync()) {
        await messaging().setAPNSToken('test');
    }

    return await messaging().getToken();
}

export async function deleteToken() {
    await AsyncStorage.removeItem(STORAGE_KEYS.FCM_TOKEN);
    return await messaging().deleteToken();
}

export function registerBackgroundNotificationHandler() {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        logInfo('Message handled in the background!', remoteMessage);
    });
}

export function onNotificationMessage() {
    messaging().onMessage(async remoteMessage => {
        showLocalNotification(remoteMessage);
    });
}

export async function showLocalNotification(message: FirebaseMessagingTypes.RemoteMessage) {
    logInfo('message ', message);
}

export function onNotificationOpen() {
    messaging().onNotificationOpenedApp(remoteMessage => {
        logInfo('Notification opened:', remoteMessage);
    });
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                logInfo('Notification caused app to open from quit state:', remoteMessage);
            }
        });
}

export function getPlatform() {
    return Platform.OS;
}
