// eslint.config.js
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['node_modules/**', 'dist/**'], // arquivos a ignorar
  },
  {
    files: ['*.js', '*.ts'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    rules: {
      'no-unused-vars': 'warn',
      'prettier/prettier': 'error',
    },
    plugins: {
      prettier: prettierPlugin,
    },
  },
  {
    files: ['*.ts'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },
];
