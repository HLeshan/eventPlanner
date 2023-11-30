import React, {useState} from 'react';
import {Image, View} from 'react-native';
import isNil from 'lodash/isNil';
import isNull from 'lodash/isNull';

import RightArrowIcon from '~/assets/images/icons/right_arrow.png';
import CameraIcon from '~/assets/images/icons/camera.png';

import Button from '~/components/clickable/Button';
import Touchable from '~/components/clickable/Touchable';
import H1 from '~/components/headings/H1';
import H2 from '~/components/headings/H2';
import PageContainer from '~/components/PageContainer';
import useAppSettings from '~/models/AppSettings';
import useAuthStore from '~/models/AuthStore';
import {ROUTES} from '~/routes/types';
import styles from './styles';
import {updateProfileImage} from '~/utils/FCMEvents';
import {navigate} from '~/utils/NavigationService';

export default function ImageUploadPage() {
    const theme = useAppSettings(state => state.theme);
    const userData = useAuthStore(state => state.userData);
    const setUserData = useAuthStore(state => state.setUserData);
    const [uploadImage, setUploadImage] = useState<string | null>(null);

    const onSubmit = async () => {
        if (!isNull(uploadImage)) {
            const response = await updateProfileImage(uploadImage);
            if (response && !isNil(userData)) {
                setUserData({...userData, profile: uploadImage});
                navigate(ROUTES.PERSONAL_INFO);
            }
        } else {
            navigate(ROUTES.PERSONAL_INFO);
        }
    };

    const setTmpImage = () => {
        setUploadImage('https://cdn-icons-png.flaticon.com/128/9408/9408175.png');
    };

    return (
        <PageContainer contentContainerStyle={styles().container}>
            <View style={styles().formContainer}>
                <View style={styles().titleContainer}>
                    <H1 label={'Welcome'} />
                    <H2
                        label={'You are logged in for the first time and can upload a profile photo'}
                        textStyle={styles().subtitleText}
                        containerStyle={styles().subTitleWrapper}
                    />
                </View>

                {!isNull(uploadImage) ? (
                    <Image source={{uri: uploadImage}} style={styles().profileImage} />
                ) : (
                    <Touchable style={styles(theme).imageUploadContainer} onPress={setTmpImage}>
                        <Image source={CameraIcon} style={styles(theme).cameraIcon} />
                    </Touchable>
                )}
            </View>
            <View style={styles().buttonContainer}>
                <Button onPress={onSubmit} title={'Next'} rightIcon={RightArrowIcon} />
            </View>
        </PageContainer>
    );
}
