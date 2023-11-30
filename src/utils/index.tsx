import {ALERT, type AlertContentType} from '~/components/modals/AlertModal';
import type {Address} from '~/services/dashboardService';

export const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const setAlertModal = (
    type = ALERT.error,
    title = 'Error',
    message = 'Something went wrong, Please try again later',
    onPress = () => {},
    onCancelPress = () => {},
): AlertContentType => {
    return {
        type,
        title,
        message,
        onPress,
        onCancelPress,
    };
};

export const normalizePhone = (value: string) => {
    if (!value) {
        return value;
    }
    const mobileNum = value.replace(/[^\d]/g, '');
    if (mobileNum.length <= 2) {
        return mobileNum;
    }
    if (mobileNum.length <= 6) {
        return `${mobileNum.slice(0, 2)} ${mobileNum.slice(2, 6)}`;
    }
    return `${mobileNum.slice(0, 2)} ${mobileNum.slice(2, 6)} ${mobileNum.slice(6, 10)}`;
};

export const getAddressString = (address: Address) => {
    return `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}.`;
};
