const prettierConf = require('./prettier.config');

module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'plugin:vue/base',
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    '@vue/airbnb',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    '@vue/typescript/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    tw: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    extraFileExtensions: [
      ".vue"
    ],
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  rules: {
    'id-length': [
      2,
      {
        exceptions: ['_', 'a', 'b', 'c', 'i', 'x', 'y', 'z'],
      },
    ],
    'no-console': [
      'error',
      {
        allow: ['error', 'info'],
      },
    ],
    'no-case-declarations': 0,
    'no-nested-ternary': 0,
    'prettier/prettier': ['error', prettierConf],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-useless-constructor': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'vue/no-multiple-template-root': 0
  },
};
