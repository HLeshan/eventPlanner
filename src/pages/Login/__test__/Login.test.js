import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import LoginPage from '~/pages/Login';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('@react-native-firebase/app', () => {
    return () => ({
        onNotification: jest.fn(),
        onNotificationDisplayed: jest.fn(),
    });
});
jest.useFakeTimers();

// this should work
jest.mock('react-native-device-info', () => () => jest.fn());

// or you can try this
jest.mock('react-native-device-info', () => ({
    default: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    mergeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
}));

jest.mock('@react-native-firebase/app', () => ({
    app: jest.fn(),
}));

jest.mock('@react-native-firebase/messaging', () => ({
    default: () => jest.fn(),
}));

jest.mock('react-native-permissions', () => require('react-native-permissions/mock'));

describe('login page', () => {
    it('should display error message when email format is wrong', () => {
        const loginPage = render(<LoginPage />);

        const usernameField = loginPage.getByTestId('usernameField');
        fireEvent.changeText(usernameField, '');

        const loginButton = loginPage.getByTestId('loginButton');
        fireEvent.press(loginButton);

        expect(usernameField.style.borderBottomColor).toBe('#FF4949');
    });
});
