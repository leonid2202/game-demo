import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'stylistic': stylistic,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "semi": [2, 'always'],
      "stylistic/object-curly-spacing": [2,'always'],
      "stylistic/array-bracket-spacing": [2,'never'],
      "stylistic/comma-spacing": [2, { "before": false, "after": true }],
      'stylistic/indent': ['error', 2],
      'stylistic/jsx-closing-tag-location': ['error'],
      'stylistic/jsx-curly-brace-presence': ['error'],
      'stylistic/jsx-curly-spacing': ['error'],
      'stylistic/jsx-self-closing-comp': ['error'],
      'stylistic/jsx-tag-spacing': ['error'],
      'stylistic/max-len': ['error', {code: 200}],
      'stylistic/no-multi-spaces': ['error'],
    },
  },
)
