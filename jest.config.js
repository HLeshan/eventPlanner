module.exports = {
    preset: 'react-native',
    transformIgnorePatterns: ['/node_modules/(?!@react-native|react-native)'],
    setupFiles: ['/src/__mocks__/@react-native-async-storage/async-storage.js'],
};
