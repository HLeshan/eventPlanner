import {Platform} from 'react-native';
import messaging, {type FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {isEmulatorSync} from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isNil from 'lodash/isNil';
import isNull from 'lodash/isNull';
import split from 'lodash/split';

import {setAlertModal} from '.';
import {ALERT} from '~/components/modals/AlertModal';
import {isDEV_, APP_SETTINGS, STORAGE_KEYS} from '~/constants';
import {logInfo} from './Logger';
import useModalControllers from '~/models/ModalControllers';
import useAuthStore, {UserData} from '~/models/AuthStore';
import {navigationReset} from './NavigationService';
import {Permission} from './PermissionHandler';
import {ROUTES} from '~/routes/types';

const startLoading = useModalControllers.getState().startLoading;
const hideLoading = useModalControllers.getState().hideLoading;

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

/*
 * Auth Services
 */

export function onAuthStateChange() {
    auth().onAuthStateChanged(user => {
        if (user !== null) {
            const userObject = mapUserObject(user);
            useAuthStore.getState().setUserData(userObject);
            navigationReset(ROUTES.DASHBOARD);
        }
    });
}

export async function createUserAccount(email: string, password: string) {
    try {
        startLoading();
        const response = await auth().createUserWithEmailAndPassword(email, password);
        hideLoading();
        if (response) {
            handleNavigation(response);
        }
    } catch (error: any) {
        hideLoading();
        logInfo('createUserAccount error', error);
        useModalControllers.getState().showAlertModal(setAlertModal(ALERT.error, 'Error', error.code));
    }
}

export async function userSignIn(email: string, password: string) {
    try {
        startLoading();
        const response = await auth().signInWithEmailAndPassword(email, password);
        hideLoading();
        if (response) {
            handleNavigation(response);
        }
    } catch (error: any) {
        hideLoading();
        logInfo('userSignIn error', error);
        useModalControllers.getState().showAlertModal(setAlertModal(ALERT.error, 'Error', error.code));
    }
}

export async function userSignOut() {
    const response = await auth().signOut();
    logInfo('response', response);
    return response;
}

function handleNavigation(response: FirebaseAuthTypes.UserCredential) {
    logInfo('response', response);
    const userObject = mapUserObject(response.user);
    useAuthStore.getState().setUserData(userObject);
    if (response.additionalUserInfo?.isNewUser) {
        navigationReset(ROUTES.IMAGE_UPLOAD);
    } else {
        navigationReset(ROUTES.DASHBOARD);
    }
}

function mapUserObject(user: FirebaseAuthTypes.User) {
    let nameSplit: string[] = [];
    if (user.displayName !== null) {
        nameSplit = split(user?.displayName, ' ', 2);
    }

    const userObject: UserData = {
        firstName: !isNil(nameSplit[0]) ? nameSplit[0] : null,
        lastName: !isNil(nameSplit[1]) ? nameSplit[1] : null,
        email: user.email!,
        mobile: '07 1234 4392',
        address: 'Sea Street, Colombo 10',
        profile: !isNull(user.photoURL) ? user.photoURL : 'https://icon-library.com/images/admin-user-icon/admin-user-icon-24.jpg',
    };

    return userObject;
}

export async function updateProfileData(userObject: UserData) {
    try {
        startLoading();
        await auth().currentUser?.updateProfile({
            displayName: `${userObject.firstName} ${userObject.lastName}`,
            photoURL: userObject.profile,
        });
        hideLoading();
        return true;
    } catch (error) {
        hideLoading();
        useModalControllers.getState().showAlertModal(setAlertModal(ALERT.error, 'Profile Update Failed'));
        return false;
    }
    // const currentUser = useAuthStore.getState().userData;
    // if (userObject.mobile !== null && userObject.mobile !== currentUser?.mobile) {
    //     const snapshot = await auth().verifyPhoneNumber('+94710897402');
    //     if (snapshot.code !== null) {
    //         const credential = auth.PhoneAuthProvider.credential(snapshot.verificationId, snapshot.code);
    //         await auth().currentUser?.updatePhoneNumber(credential);
    //     }
    // }
}

export async function updateProfileImage(photoURL: string) {
    try {
        startLoading();
        await auth().currentUser?.updateProfile({
            photoURL,
        });
        hideLoading();
        return true;
    } catch (error) {
        hideLoading();
        useModalControllers.getState().showAlertModal(setAlertModal(ALERT.error, 'Profile Image Failed'));
        return false;
    }
}
