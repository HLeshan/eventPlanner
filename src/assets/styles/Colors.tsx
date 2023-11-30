export enum THEMES {
    DEFAULT = 'default',
    DARK = 'dark',
}

export const BASIC_COLORS = {
    lightBlue: '#0759AC',
    white: '#fffffe',
    gray: '#afafaf',
    lightGray: '#ECECEC',
    darkGray: '#757779',
    black: '#0a0a15',
    red: '#f5183d',
    yellow: '#ffc523',
    maroon: '#7b0b0b',
};

const DEFAULT_THEME_BASIC_COLORS = {
    primary: '#DA5E42',
    secondary: '#DA5E4214',
    tertiary: '#C7D1DB',
    quaternary: '#444749',
    quinary: '#C5C6C8',
    success: '#0CC029',
    error: '#FF4949',
    warning: '#deb81a',
    info: '#45aaf2',
    disabled: '#bebebe',
};

const DARK_THEME_BASIC_COLORS = {
    primary: '#20a877',
    secondary: '#20a87714',
    tertiary: '#C7D1DB',
    quaternary: '#9FB3D2',
    quinary: '#ffffde',
    success: '#0CC029',
    error: '#FF4949',
    warning: '#deb81a',
    info: '#45aaf2',
    disabled: '#bebebe',
};

const APP_THEMES = {
    [THEMES.DEFAULT]: {
        ...BASIC_COLORS,
        ...DEFAULT_THEME_BASIC_COLORS,
        dark: false,

        primaryTextColor: DEFAULT_THEME_BASIC_COLORS.primary,
        secondaryTextColor: DEFAULT_THEME_BASIC_COLORS.quaternary,
        placeHolderTextColor: BASIC_COLORS.gray,
        buttonTextColor: BASIC_COLORS.white,

        primaryBorderColor: DEFAULT_THEME_BASIC_COLORS.tertiary,
        secondaryBorderColor: DEFAULT_THEME_BASIC_COLORS.quaternary,

        background: BASIC_COLORS.white,

        transparentOverlay: 'rgba(0,0,0,0.7)',
    },
    [THEMES.DARK]: {
        ...BASIC_COLORS,
        ...DARK_THEME_BASIC_COLORS,
        dark: true,

        primaryTextColor: DARK_THEME_BASIC_COLORS.secondary,
        secondaryTextColor: BASIC_COLORS.white,
        placeHolderTextColor: BASIC_COLORS.gray,
        buttonTextColor: BASIC_COLORS.white,

        primaryBorderColor: DARK_THEME_BASIC_COLORS.tertiary,
        secondaryBorderColor: DARK_THEME_BASIC_COLORS.quaternary,

        background: BASIC_COLORS.black,

        transparentOverlay: 'rgba(0,0,0,0.5)',
    },
};

export type DEFAULT_THEME_KEYS = keyof typeof DEFAULT_THEME_BASIC_COLORS;

export default APP_THEMES;
