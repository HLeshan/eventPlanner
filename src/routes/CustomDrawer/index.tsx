import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {getBuildNumber, getVersion} from 'react-native-device-info';

import LogoutIcon from '~/assets/images/icons/logout.png';
import Touchable from '~/components/clickable/Touchable';
import useAppSettings from '~/models/AppSettings';
import useAuthStore from '~/models/AuthStore';
import useDashboardStore from '~/models/DashboardStore';
import styles from './styles';
import {ROUTES} from '../types';
import {userSignOut} from '~/utils/FCMEvents';
import {navigationReset} from '~/utils/NavigationService';

const CustomDrawer = () => {
    const theme = useAppSettings(state => state.theme);
    const userData = useAuthStore(state => state.userData);
    const resetAuthData = useAuthStore(state => state.resetAuthData);
    const resetDashboardData = useDashboardStore(state => state.resetDashboardData);
    const [appVersion, setAppVersion] = useState('');

    useEffect(() => {
        async function getAppVersion() {
            const buildNo = await getBuildNumber();
            const versionName = await getVersion();
            setAppVersion(`Version ${versionName}.${buildNo}`);
        }
        getAppVersion();
    }, []);

    const logout = async () => {
        userSignOut().then(() => {
            navigationReset(ROUTES.LOGIN);
            resetAuthData();
            resetDashboardData();
        });
    };

    return (
        <SafeAreaView style={styles(theme).container}>
            <View style={styles(theme).headerContainer}>
                {userData?.profile && <Image source={{uri: userData?.profile}} style={styles().profileImage} />}
                <View>
                    <Text style={styles(theme).headerText}>{`${userData?.firstName} ${userData?.lastName}`}</Text>
                    <Text style={styles(theme).subHeaderText}>{userData?.email}</Text>
                </View>
            </View>

            <View style={styles(theme).drawerContentContainer}>
                <Touchable style={styles(theme).drawerItemWrapper} onPress={logout}>
                    <Image source={LogoutIcon} style={styles(theme).drawerItemIcon} />
                    <Text style={styles(theme).drawerItemText}>Logout</Text>
                </Touchable>
            </View>

            <Text style={styles(theme).appVersionText}>{appVersion}</Text>
        </SafeAreaView>
    );
};

export default CustomDrawer;
