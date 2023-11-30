import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import {Form} from 'react-final-form';
import {combine, email, required} from 'redux-form-validators';

import MailIcon from '~/assets/images/icons/mail.png';
import LockIcon from '~/assets/images/icons/lock.png';
import RightArrowIcon from '~/assets/images/icons/right_arrow.png';
import RightTopIcon from '~/assets/images/icons/right_top.png';

import Button from '~/components/clickable/Button';
import TextInputField from '~/components/formComponents/TextBox';
import H1 from '~/components/headings/H1';
import H2 from '~/components/headings/H2';
import PageContainer from '~/components/PageContainer';
import useAppSettings from '~/models/AppSettings';
import useAuthStore from '~/models/AuthStore';
import {ROUTES} from '~/routes/types';
import styles from './styles';
import {checkNotificationPermission, getNotificationToken, onNotificationMessage} from '~/utils/FCMEvents';
import {logInfo} from '~/utils/Logger';
import {navigate} from '~/utils/NavigationService';

type AuthPayload = {
    username: string;
    password: string;
};

export default function LoginPage() {
    const theme = useAppSettings(state => state.theme);
    const setUserData = useAuthStore(state => state.setUserData);

    useEffect(() => {
        async function checkPermission() {
            const permissionEnabled = await checkNotificationPermission();
            if (permissionEnabled) {
                await getNotificationToken();
            }
        }

        checkPermission();
        const unsubscribe = onNotificationMessage();

        return () => {
            unsubscribe;
        };
    }, []);

    const onSubmit = async (values: AuthPayload) => {
        logInfo(values);
        setUserData({
            firstName: 'test',
            lastName: 'test',
            email: 'test@ff.com',
            mobile: '12 3456 7890',
            address: 'test',
            profile: 'https://www.corporatephotographerslondon.com/wp-content/uploads/2021/07/LinkedIn_profile_photo_sample_1-300x300.jpg',
        });
        navigate(ROUTES.IMAGE_UPLOAD);
    };

    return (
        <PageContainer contentContainerStyle={styles().container}>
            <Form
                onSubmit={onSubmit}
                render={({handleSubmit}) => (
                    <>
                        <View style={styles().formContainer}>
                            <View style={styles().titleContainer}>
                                <H1 label={'Welcome'} />
                                <H2 label={'Welcome to your portal'} />
                            </View>

                            <View>
                                <TextInputField
                                    name={'username'}
                                    label={'Email'}
                                    validate={combine(required(), email())}
                                    keyboardType={'email-address'}
                                    autoCapitalize={'none'}
                                    leftIcon={MailIcon}
                                />
                                <TextInputField name={'password'} label={'Password'} password validate={required()} leftIcon={LockIcon} />
                                <View style={styles().restorePwContainer}>
                                    <Text style={styles(theme).restoreText}>Restore Password</Text>
                                    <Image style={styles(theme).restoreIcon} source={RightTopIcon} />
                                </View>
                            </View>
                        </View>
                        <View style={styles().buttonContainer}>
                            <Button onPress={handleSubmit} title={'Login'} rightIcon={RightArrowIcon} />
                            <Button onPress={() => navigate(ROUTES.SIGN_UP)} title={'Sign Up'} rightIcon={RightArrowIcon} />
                        </View>
                    </>
                )}
            />
        </PageContainer>
    );
}
