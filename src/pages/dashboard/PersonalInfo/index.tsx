import React from 'react';
import {View} from 'react-native';
import {Form} from 'react-final-form';
import {combine, email, format, required} from 'redux-form-validators';

import LeftArrowIcon from '~/assets/images/icons/left_arrow.png';
import RightArrowIcon from '~/assets/images/icons/right_arrow.png';

import Button from '~/components/clickable/Button';
import TextInputField from '~/components/formComponents/TextBox';
import H1 from '~/components/headings/H1';
import H2 from '~/components/headings/H2';
import PageContainer from '~/components/PageContainer';
import {VALIDATIONS} from '~/constants';
import useAuthStore from '~/models/AuthStore';
import {ROUTES} from '~/routes/types';
import styles from './styles';
import {normalizePhone} from '~/utils';
import {logInfo} from '~/utils/Logger';
import {navigate, navigationGoBack} from '~/utils/NavigationService';

import type {UserData} from '~/models/AuthStore';

export default function PersonalInfoPage() {
    const userData = useAuthStore(state => state.userData);

    const onSubmit = async (values: UserData) => {
        logInfo(values);
        navigate(ROUTES.DASHBOARD);
    };

    return (
        <PageContainer contentContainerStyle={styles.container}>
            <Form
                initialValues={userData}
                onSubmit={onSubmit}
                render={({handleSubmit}) => (
                    <>
                        <View style={styles.formContainer}>
                            <H1 label={'Personal info'} textStyle={styles.headingText} />
                            <H2 label={'You can add your personal data now or do it later'} />

                            <TextInputField name={'firstName'} label={'First Name'} validate={required()} />
                            <TextInputField name={'lastName'} label={'Last Name'} validate={required()} />
                            <TextInputField
                                name={'email'}
                                label={'Email'}
                                validate={combine(required(), email())}
                                keyboardType={'email-address'}
                                autoCapitalize={'none'}
                            />
                            <TextInputField
                                name={'mobile'}
                                label={'Mobile'}
                                placeholder={'12 3456 7890'}
                                validate={combine(required(), format(VALIDATIONS.PHONE_NO))}
                                keyboardType={'phone-pad'}
                                maxLength={12}
                                parse={normalizePhone}
                            />

                            <TextInputField name={'address'} label={'Mailing address'} validate={required()} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                isSecondary
                                onPress={() => navigationGoBack()}
                                title={'Back'}
                                leftIcon={LeftArrowIcon}
                                containerStyle={styles.buttonWrapper}
                            />
                            <Button onPress={handleSubmit} title={'Next'} rightIcon={RightArrowIcon} containerStyle={styles.buttonWrapper} />
                        </View>
                    </>
                )}
            />
        </PageContainer>
    );
}
