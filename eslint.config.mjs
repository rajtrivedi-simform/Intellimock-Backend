import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default defineConfig([
  { ignores: ['node_modules', '**/*.{js,mjs,cjs}'] },
  { files: ['**/*.ts'] },
  { files: ['**/*.ts'], languageOptions: { globals: globals.browser } },
  { files: ['**/*.ts'], plugins: { js }, extends: ['js/recommended'] },
  tseslint.configs.recommended,
]);
