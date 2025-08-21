// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: process.cwd(), recommended: true });

export default [
  ...compat.extends('eslint:recommended'),
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module', // importante
      },
    },
    rules: {
      'no-unused-vars': 'off',
    },
  },
];
