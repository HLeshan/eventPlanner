import React from 'react';
import {Image, ImageSourcePropType, Platform} from 'react-native';
import {createBottomTabNavigator, type BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator, type DrawerNavigationOptions} from '@react-navigation/drawer';
import {createStackNavigator, type StackNavigationOptions} from '@react-navigation/stack';

import HomeIcon from '~/assets/images/icons/home.png';
import ProfileIcon from '~/assets/images/icons/profile.png';
import APP_THEMES from '~/assets/styles/Colors';
import {FONTS, normalizeFont} from '~/assets/styles/CustomFonts';
import CustomDrawer from './CustomDrawer';
import useAppSettings from '~/models/AppSettings';
import {ROUTES} from './types';
import type {DrawerStackParamList, RootStackParamList} from './types';

import LoginPage from '~/pages/Login';
import SignUpPage from '~/pages/SignUp';
import ImageUploadPage from '~/pages/dashboard/ImageUpload';
import PersonalInfoPage from '~/pages/dashboard/PersonalInfo';
import ProfilePage from '~/pages/dashboard/Profile';
import HomePage from '~/pages/dashboard/Home';

const theme = useAppSettings.getState().theme;
const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const headerOptions: StackNavigationOptions = {
    headerShown: false,
    gestureEnabled: false,
};

export const RootNavigator = () => {
    return (
        <Stack.Navigator screenOptions={headerOptions}>
            <Stack.Screen name={ROUTES.LOGIN} component={LoginPage} />
            <Stack.Screen name={ROUTES.SIGN_UP} component={SignUpPage} />
            <Stack.Screen name={ROUTES.IMAGE_UPLOAD} component={ImageUploadPage} />
            <Stack.Screen name={ROUTES.PERSONAL_INFO} component={PersonalInfoPage} />
            <Stack.Screen name={ROUTES.DASHBOARD} component={DrawerNavigator} />
        </Stack.Navigator>
    );
};

const drawerOptions: DrawerNavigationOptions = {
    headerShown: false,
    swipeEnabled: true,
};

export const DrawerNavigator = () => {
    return (
        <Drawer.Navigator screenOptions={drawerOptions} drawerContent={CustomDrawer}>
            <Drawer.Screen name={ROUTES.DASHBOARD_DRAWER} component={DashboardTabs} />
        </Drawer.Navigator>
    );
};

const tabBarOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarLabelStyle: {fontFamily: FONTS.Bold, fontSize: normalizeFont(12), marginBottom: 5},
    tabBarActiveTintColor: APP_THEMES[theme].primary,
    tabBarStyle: {height: Platform.OS === 'ios' ? 88 : 60, paddingVertical: 5, justifyContent: 'center', backgroundColor: APP_THEMES[theme].black},
};

const TabBarIcon = ({color, size, icon}: {color: string; size: number; icon: ImageSourcePropType}) => (
    <Image source={icon} style={{tintColor: color, width: size, height: size}} />
);

const DashboardTabs = () => {
    return (
        <Tab.Navigator screenOptions={tabBarOptions}>
            <Tab.Screen
                name={ROUTES.HOME}
                component={HomePage}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: props => <TabBarIcon {...props} icon={HomeIcon} />,
                }}
            />
            <Tab.Screen
                name={ROUTES.PROFILE}
                component={ProfilePage}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: props => <TabBarIcon {...props} icon={ProfileIcon} />,
                }}
            />
        </Tab.Navigator>
    );
};
