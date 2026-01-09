const { defineConfig, globalIgnores } = require('eslint/config');

const tsParser = require('@typescript-eslint/parser');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

module.exports = defineConfig([
  {
    ignores: ['dist/**', 'node_modules/**']
  },
  globalIgnores(['eslint.config.cjs']),

  {
    languageOptions: {
      parser: tsParser
    },

    plugins: {
      '@typescript-eslint': typescriptEslint
    },

    extends: compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended'),

    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  }
]);
