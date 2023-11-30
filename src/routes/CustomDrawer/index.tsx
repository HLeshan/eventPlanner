import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {getBuildNumber, getVersion} from 'react-native-device-info';

import LogoutIcon from '~/assets/images/icons/logout.png';
import Touchable from '~/components/clickable/Touchable';
import useAppSettings from '~/models/AppSettings';
import useAuthStore from '~/models/AuthStore';
import styles from './styles';
import {ROUTES} from '../types';
import {navigationReset} from '~/utils/NavigationService';

const CustomDrawer = () => {
    const theme = useAppSettings(state => state.theme);
    const userData = useAuthStore(state => state.userData);
    const [appVersion, setAppVersion] = useState('');

    useEffect(() => {
        async function getAppVersion() {
            const buildNo = await getBuildNumber();
            const versionName = await getVersion();
            setAppVersion(`Version ${versionName}.${buildNo}`);
        }
        getAppVersion();
    }, []);

    return (
        <SafeAreaView style={styles(theme).container}>
            <View style={styles(theme).headerContainer}>
                <Image source={{uri: userData?.profile}} style={styles().profileImage} />
                <View>
                    <Text style={styles(theme).headerText}>{`${userData?.firstName} ${userData?.lastName}`}</Text>
                    <Text style={styles(theme).subHeaderText}>{userData?.email}</Text>
                </View>
            </View>

            <View style={styles(theme).drawerContentContainer}>
                <Touchable style={styles(theme).drawerItemWrapper} onPress={() => navigationReset(ROUTES.LOGIN)}>
                    <Image source={LogoutIcon} style={styles(theme).drawerItemIcon} />
                    <Text style={styles(theme).drawerItemText}>Logout</Text>
                </Touchable>
            </View>

            <Text style={styles(theme).appVersionText}>{appVersion}</Text>
        </SafeAreaView>
    );
};

export default CustomDrawer;
