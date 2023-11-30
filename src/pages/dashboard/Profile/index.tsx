import React, {useRef, useState} from 'react';
import {Image, View} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {Form} from 'react-final-form';
import {combine, email, format, required} from 'redux-form-validators';
import isNull from 'lodash/isNull';

import RightArrowIcon from '~/assets/images/icons/left_arrow.png';
import CameraIcon from '~/assets/images/icons/camera.png';

import Button from '~/components/clickable/Button';
import Touchable from '~/components/clickable/Touchable';
import H1 from '~/components/headings/H1';
import TextInputField from '~/components/formComponents/TextBox';
import {ALERT} from '~/components/modals/AlertModal';
import PageContainer from '~/components/PageContainer';
import {VALIDATIONS} from '~/constants';
import useAppSettings from '~/models/AppSettings';
import useAuthStore from '~/models/AuthStore';
import useModalControllers from '~/models/ModalControllers';
import styles from './styles';
import {normalizePhone, setAlertModal} from '~/utils';
import {updateProfileData} from '~/utils/FCMEvents';

import type {FormApi} from 'final-form';
import type {StackScreenProps} from '@react-navigation/stack';
import type {UserData} from '~/models/AuthStore';
import type {DashboardStackParamList} from '~/routes/types';

export default function ProfilePage({navigation}: StackScreenProps<DashboardStackParamList>) {
    const theme = useAppSettings(state => state.theme);
    const userData = useAuthStore(state => state.userData);
    const setUserData = useAuthStore(state => state.setUserData);
    const showAlertModal = useModalControllers(state => state.showAlertModal);

    const [updateForm, setUpdateForm] = useState(false);
    const [uploadImage, setUploadImage] = useState<string | null>(null);
    const formRef = useRef<FormApi<UserData> | null>(null);

    const onSubmit = async (values: UserData) => {
        if (!isNull(uploadImage)) {
            values.profile = uploadImage;
        }

        const response = await updateProfileData(values);
        if (response) {
            showAlertModal(setAlertModal(ALERT.success, 'Profile Update Success', 'Successfully updated profile data', () => setUpdateForm(false)));
            setUserData(values);
        }
    };

    const setTmpImage = () => {
        setUploadImage('https://static.vecteezy.com/system/resources/thumbnails/004/819/319/small/cartoon-avatar-of-smiling-beard-man-profile-icon-vector.jpg');
    };

    return (
        <PageContainer>
            <View style={styles(theme).headerContainer}>
                <View style={styles().headerDefault}>
                    {updateForm ? (
                        <Touchable style={styles().undoIconContainer} onPress={() => setUpdateForm(false)}>
                            <Image source={RightArrowIcon} style={styles(theme).undoIcon} />
                        </Touchable>
                    ) : (
                        <Touchable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                            <Image source={{uri: userData?.profile}} style={styles().headerProfileImage} />
                        </Touchable>
                    )}
                </View>
                <View style={styles().headerDefault}>
                    <H1 label={updateForm ? 'Edit Profile' : 'Profile'} textStyle={styles().headerTitle} />
                </View>
                <View style={styles().headerDefault} />
            </View>

            <Form
                onSubmit={onSubmit}
                initialValues={userData}
                render={({form, pristine, submitting, handleSubmit}) => {
                    formRef.current = form;
                    return (
                        <View style={styles().formContainer}>
                            <Touchable disabled={!updateForm} onPress={setTmpImage}>
                                <View style={styles().profileImageContainer}>
                                    {!isNull(uploadImage) ? (
                                        <Image source={{uri: uploadImage}} style={styles().profileImage} />
                                    ) : (
                                        <Image source={{uri: userData?.profile}} style={styles().profileImage} />
                                    )}
                                    {updateForm && <Image source={CameraIcon} style={styles(theme).cameraIcon} />}
                                </View>
                            </Touchable>

                            <TextInputField name={'firstName'} label={'First Name'} validate={required()} editable={updateForm} />
                            <TextInputField name={'lastName'} label={'Last Name'} validate={required()} editable={updateForm} />
                            <TextInputField
                                name={'email'}
                                label={'Email'}
                                validate={combine(required(), email())}
                                keyboardType={'email-address'}
                                autoCapitalize={'none'}
                                editable={updateForm}
                            />
                            <TextInputField
                                name={'mobile'}
                                label={'Mobile'}
                                placeholder={'12 3456 7890'}
                                validate={combine(required(), format(VALIDATIONS.PHONE_NO))}
                                keyboardType={'phone-pad'}
                                maxLength={12}
                                parse={normalizePhone}
                                editable={updateForm}
                            />

                            <TextInputField name={'address'} label={'Mailing address'} validate={required()} editable={updateForm} />

                            {updateForm ? (
                                <Button onPress={handleSubmit} disabled={submitting || pristine} title={'Save'} />
                            ) : (
                                <Button onPress={() => setUpdateForm(true)} title={'Edit'} />
                            )}
                        </View>
                    );
                }}
            />
        </PageContainer>
    );
}
