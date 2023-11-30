import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

import {THEMES} from '~/assets/styles/Colors';

type AppSettings = {
    theme: THEMES;
    changeTheme: (theme: THEMES) => void;
};

const useAppSettings = create<AppSettings>()(
    persist(
        set => ({
            theme: THEMES.DEFAULT,
            changeTheme: theme => {
                set({theme: theme});
            },
        }),
        {
            name: 'app-settings',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);

export default useAppSettings;
