module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest', // use Babel for JS/TS files
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
        'node_modules/(?!(make-plural|i18n-js)/)', // transform these ESM modules
    ],
};
