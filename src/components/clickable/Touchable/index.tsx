import React from 'react';
import {Platform, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';

import type {ReactNode} from 'react';
import type {TouchableWithoutFeedbackProps} from 'react-native';

interface TouchableProps extends TouchableWithoutFeedbackProps {
    children: ReactNode;
}

const Touchable: React.FC<TouchableProps> = ({children, style, ...props}) =>
    Platform.OS === 'android' ? (
        <TouchableNativeFeedback {...props} background={TouchableNativeFeedback.Ripple('#dbdbdb', false)}>
            <View style={style}>{children}</View>
        </TouchableNativeFeedback>
    ) : (
        <TouchableOpacity style={style} {...props}>
            {children}
        </TouchableOpacity>
    );

export default Touchable;
