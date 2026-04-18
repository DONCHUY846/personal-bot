// @ts-check
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['**/*.js', '**/*.{ts,mts,cts}'],
    languageOptions: { sourceType: 'commonjs', globals: globals.node },
  },
  ...tseslint.configs.recommended,
  js.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*', '../../*', './*'],
              message: 'Please use an import alias instead of relative parent paths.',
            },
          ],
        },
      ],
    },
  },
]);
