import {create} from 'zustand';

export interface UserData {
    firstName: string | null;
    lastName: string | null;
    email: string;
    mobile: string | null;
    address: string | null;
    profile: string;
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
