import React from 'react';

import {CommonActions, NavigationContainerRef} from '@react-navigation/native';
import {ROUTES, type RootStackParamList} from '~/routes/types';

export const navigationRef = React.createRef<NavigationContainerRef<RootStackParamList>>();

export function navigate(name: ROUTES, params?: object, key?: string) {
    navigationRef.current?.dispatch(CommonActions.navigate({name, params, key}));
}

export function navigationReset(name: ROUTES) {
    navigationRef.current?.reset({index: 0, routes: [{name: name}]});
}

export function navigationGoBack() {
    navigationRef.current?.goBack();
}

export default {
    navigate,
};
