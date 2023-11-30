//TODO: set false in Production
export const isDEV_ = true;

export const APP_SETTINGS = {
    DEFAULT: 'eventPlanner_default',
};

export const VALIDATIONS = {
    PHONE_NO: {
        with: /^[0-9]{2} [0-9]{4} [0-9]{4}$/i,
        message: 'Invalid Phone Number',
    },
};
