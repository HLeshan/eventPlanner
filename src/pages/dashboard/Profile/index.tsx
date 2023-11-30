import React, {useRef, useState} from 'react';
import {Image, View} from 'react-native';
import {Form} from 'react-final-form';
import {combine, email, format, required} from 'redux-form-validators';

import RightArrowIcon from '~/assets/images/icons/left_arrow.png';
import CameraIcon from '~/assets/images/icons/camera.png';

import Button from '~/components/clickable/Button';
import Touchable from '~/components/clickable/Touchable';
import H1 from '~/components/headings/H1';
import TextInputField from '~/components/formComponents/TextBox';
import PageContainer from '~/components/PageContainer';
import {VALIDATIONS} from '~/constants';
import useAppSettings from '~/models/AppSettings';
import useAuthStore from '~/models/AuthStore';
import styles from './styles';
import {normalizePhone} from '~/utils';
import {logInfo} from '~/utils/Logger';

import type {FormApi} from 'final-form';
import type {UserData} from '~/models/AuthStore';

export default function ProfilePage() {
    const theme = useAppSettings(state => state.theme);
    const userData = useAuthStore(state => state.userData);

    const [updateForm, setUpdateForm] = useState(false);
    const formRef = useRef<FormApi<UserData> | null>(null);

    const onSubmit = async (values: UserData) => {
        logInfo(values);
        // const response = await initiateServiceCall(saveRecordService(values), setDefaultAlertBox);
        // if (response.code === 1000) {
        //     setDefaultAlertBox(ALERT.success, 'Success', response.status, () => formRef.current?.restart());
        // }
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
                        <Image source={{uri: userData?.profile}} style={styles().headerProfileImage} />
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
                render={({form, handleSubmit}) => {
                    formRef.current = form;
                    return (
                        <View style={styles().formContainer}>
                            <Touchable disabled={!updateForm}>
                                <View style={styles().profileImageContainer}>
                                    <Image source={{uri: userData?.profile}} style={styles().profileImage} />
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
                                placeholder={'123-456-7890'}
                                validate={combine(required(), format(VALIDATIONS.PHONE_NO))}
                                keyboardType={'phone-pad'}
                                maxLength={12}
                                parse={normalizePhone}
                                editable={updateForm}
                            />

                            <TextInputField name={'address'} label={'Mailing address'} validate={required()} editable={updateForm} />

                            {updateForm ? <Button onPress={handleSubmit} title={'Save'} /> : <Button onPress={() => setUpdateForm(true)} title={'Edit'} />}
                        </View>
                    );
                }}
            />
        </PageContainer>
    );
}
