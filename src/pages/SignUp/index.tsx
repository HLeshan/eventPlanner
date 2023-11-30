import React from 'react';
import {View} from 'react-native';
import {Form} from 'react-final-form';
import {combine, confirmation, email, required} from 'redux-form-validators';

import MailIcon from '~/assets/images/icons/mail.png';
import LockIcon from '~/assets/images/icons/lock.png';
import RightArrowIcon from '~/assets/images/icons/right_arrow.png';

import Button from '~/components/clickable/Button';
import TextInputField from '~/components/formComponents/TextBox';
import H1 from '~/components/headings/H1';
import H2 from '~/components/headings/H2';
import PageContainer from '~/components/PageContainer';
import {ROUTES} from '~/routes/types';
import styles from './styles';
import {logInfo} from '~/utils/Logger';
import {navigate} from '~/utils/NavigationService';

import type {AuthPayload} from '~/services/authService';

export default function SignUpPage() {
    const onSubmit = async (values: AuthPayload) => {
        logInfo(values);
    };

    return (
        <PageContainer contentContainerStyle={styles.container}>
            <Form
                onSubmit={onSubmit}
                render={({handleSubmit}) => (
                    <>
                        <View style={styles.formContainer}>
                            <View style={styles.titleContainer}>
                                <H1 label={'Welcome'} />
                                <H2 label={'Welcome to your portal'} />
                            </View>

                            <View>
                                <TextInputField
                                    name={'username'}
                                    label={'Email'}
                                    validate={combine(required(), email())}
                                    leftIcon={MailIcon}
                                    keyboardType={'email-address'}
                                    autoCapitalize={'none'}
                                />
                                <TextInputField name={'newPassword'} label={'Password'} password validate={required()} leftIcon={LockIcon} />
                                <TextInputField
                                    name={'confirmPassword'}
                                    label={'Confirm Password'}
                                    password
                                    validate={combine(required(), confirmation({field: 'newPassword', message: 'Password Mismatched'}))}
                                    leftIcon={LockIcon}
                                />
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button onPress={handleSubmit} title={'Sign Up'} rightIcon={RightArrowIcon} />
                            <Button onPress={() => navigate(ROUTES.LOGIN)} title={'Login'} rightIcon={RightArrowIcon} />
                        </View>
                    </>
                )}
            />
        </PageContainer>
    );
}
