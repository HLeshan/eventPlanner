import React from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';

import Touchable from '~/components/clickable/Touchable';
import useAppSettings from '~/models/AppSettings';
import useModalControllers from '~/models/ModalControllers';
import styles from './styles';

import type {DEFAULT_THEME_KEYS} from '~/assets/styles/Colors';

export enum ALERT {
    success = 'success',
    warning = 'warning',
    error = 'error',
    confirm = 'confirm',
}

export type AlertContentType = {
    type: ALERT;
    title: string;
    message: string;
    onPress?: () => void;
    onCancelPress?: () => void;
};

type AlertObject = {
    color: DEFAULT_THEME_KEYS;
    title: string;
    image?: any;
};

type AlertTypes = {
    [key in ALERT]: AlertObject;
};

const ALERT_TYPES: AlertTypes = {
    [ALERT.success]: {
        color: 'success',
        title: 'Successful',
    },
    [ALERT.warning]: {
        color: 'warning',
        title: 'Something went wrong',
    },
    [ALERT.error]: {
        color: 'error',
        title: 'Error',
    },
    [ALERT.confirm]: {
        color: 'primary',
        title: 'CONFIRM!',
    },
};

export default function AlertModal() {
    const theme = useAppSettings(state => state.theme);
    const modalContent = useModalControllers(state => state.alertContent);
    const hideModal = useModalControllers(state => state.hideAlertModal);

    const confirmPress = () => {
        modalContent?.onPress && modalContent?.onPress();
        hideModal();
    };

    const cancelPress = () => {
        modalContent?.onCancelPress && modalContent?.onCancelPress();
        hideModal();
    };

    return (
        <View style={styles().container}>
            <Modal isVisible={modalContent !== null}>
                <View>
                    <View style={styles(theme).modalContainer}>
                        <View style={styles().contentContainer}>
                            <View style={styles().dataContainer}>
                                {modalContent && <Text style={styles(theme, ALERT_TYPES[modalContent?.type].color).titleText}>{modalContent?.title}</Text>}
                                <Text style={styles(theme).msgText}>{modalContent?.message}</Text>
                            </View>

                            {modalContent && (
                                <View>
                                    {modalContent?.type === ALERT.confirm ? (
                                        <View style={styles().rowContainer}>
                                            <Touchable onPress={cancelPress} style={styles().btnContainer}>
                                                <Text style={styles(theme).btnText}>No</Text>
                                            </Touchable>
                                            <Touchable onPress={confirmPress} style={styles().btnContainer}>
                                                <Text style={styles(theme).btnConfirmText}>Yes</Text>
                                            </Touchable>
                                        </View>
                                    ) : (
                                        <Touchable onPress={confirmPress} style={styles(theme, ALERT_TYPES[modalContent?.type].color).buttonWrapper}>
                                            <Text style={styles(theme).closeBtnText}>Close</Text>
                                        </Touchable>
                                    )}
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
