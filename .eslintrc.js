module.exports = {
    root: true,
    extends: '@react-native',
    rules: {
        indent: ['error', 4, {SwitchCase: 1}],
    },
    settings: {
        'import/resolver': {
            'babel-plugin-root-import': {
                rootPathPrefix: '~',
                rootPathSuffix: 'src',
            },
        },
    },
};
