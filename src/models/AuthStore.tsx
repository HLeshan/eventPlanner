import {create} from 'zustand';

export interface UserData {
    firstName: string;
    lastName?: string;
    email: string;
    mobile?: string;
    address?: string;
    profile?: string;
}

type AuthStore = {
    userData: UserData | null;
    setUserData: (userData: UserData) => void;
    resetAuthData: () => void;
};

const useAuthStore = create<AuthStore>(set => ({
    userData: null,
    setUserData: userData => {
        set({userData});
    },
    resetAuthData: () => {
        set({userData: null});
    },
}));

export default useAuthStore;
