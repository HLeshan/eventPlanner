import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';
import useModalControllers from '~/models/ModalControllers';

export default function LoadingModal() {
    const isLoading = useModalControllers(state => state.loading) > 0;
    return (
        <>
            <Modal isVisible={isLoading}>
                <View style={styles().container}>
                    <ActivityIndicator size={'large'} />
                </View>
            </Modal>
        </>
    );
}
