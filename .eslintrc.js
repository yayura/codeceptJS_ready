module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    'plugin:codeceptjs/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    camelcase: 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'no-unused-expressions': 'off',
    'no-console': 'off',
    'no-useless-concat': 'off',
  },
};
