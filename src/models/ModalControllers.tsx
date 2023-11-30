import {Platform} from 'react-native';
import {create} from 'zustand';

import type {AlertContentType} from '~/components/modals/AlertModal';
import {sleep} from '~/utils';

type ModalControllers = {
    //Loading Modal Controllers
    loading: number;
    loadingText?: string;
    startLoading: (text?: string) => void;
    hideLoading: () => void;

    //Alert Modal Controllers
    alertContent: AlertContentType | null;
    showAlertModal: (content: AlertContentType) => void;
    hideAlertModal: () => void;
};

const useModalControllers = create<ModalControllers>((set, get) => ({
    //Loading Modal Controllers
    loading: 0,
    loadingText: '',
    startLoading: async text => {
        if (Platform.OS === 'ios' && get().alertContent !== null) {
            get().hideAlertModal();
            await sleep(500);
        }

        set(state => ({
            loading: state.loading + 1,
            loadingText: text ? text : '',
        }));
    },
    hideLoading() {
        set(state => ({
            loading: state.loading > 0 ? state.loading - 1 : 0,
            loadingText: '',
        }));
    },

    //Alert Modal Controllers
    alertContent: null,
    showAlertModal: async content => {
        if (Platform.OS === 'ios' && get().loading !== 0) {
            get().hideLoading();
            await sleep(500);
        }

        set(() => ({alertContent: content}));
    },
    hideAlertModal: () => {
        set({alertContent: null});
    },
}));

export default useModalControllers;
