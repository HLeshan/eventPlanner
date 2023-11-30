import type {NavigatorScreenParams} from '@react-navigation/native';

export enum ROUTES {
    LOGIN = 'login',
    SIGN_UP = 'sign_up',
    IMAGE_UPLOAD = 'image_upload',
    PERSONAL_INFO = 'personal_info',

    DASHBOARD = 'dashboard',
    DASHBOARD_DRAWER = 'dashboard_drawer',
    HOME = 'home',
    PROFILE = 'profile',
}

export type RootStackParamList = {
    [ROUTES.LOGIN]: undefined;
    [ROUTES.SIGN_UP]: undefined;
    [ROUTES.IMAGE_UPLOAD]: undefined;
    [ROUTES.PERSONAL_INFO]: undefined;

    [ROUTES.DASHBOARD]: undefined;
    [ROUTES.HOME]: undefined;
    [ROUTES.PROFILE]: undefined;
};

export type DashboardStackParamList = {
    [ROUTES.DASHBOARD]: undefined;
    [ROUTES.HOME]: undefined;
    [ROUTES.PROFILE]: undefined;
};

export type DrawerStackParamList = {
    [ROUTES.DASHBOARD_DRAWER]: NavigatorScreenParams<DashboardStackParamList>;
};
