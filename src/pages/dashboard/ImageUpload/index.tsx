import React from 'react';
import {Image, View} from 'react-native';

import RightArrowIcon from '~/assets/images/icons/right_arrow.png';
import CameraIcon from '~/assets/images/icons/camera.png';

import Button from '~/components/clickable/Button';
import Touchable from '~/components/clickable/Touchable';
import H1 from '~/components/headings/H1';
import H2 from '~/components/headings/H2';
import PageContainer from '~/components/PageContainer';
import useAppSettings from '~/models/AppSettings';
import {ROUTES} from '~/routes/types';
import styles from './styles';
import {navigate} from '~/utils/NavigationService';

export default function ImageUploadPage() {
    const theme = useAppSettings(state => state.theme);

    const onSubmit = async () => {
        navigate(ROUTES.PERSONAL_INFO);
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

                <Touchable style={styles(theme).imageUploadContainer}>
                    <Image source={CameraIcon} style={styles(theme).cameraIcon} />
                </Touchable>
            </View>
            <View style={styles().buttonContainer}>
                <Button onPress={onSubmit} title={'Next'} rightIcon={RightArrowIcon} />
            </View>
        </PageContainer>
    );
}
