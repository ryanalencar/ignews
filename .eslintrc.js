module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'next/core-web-vitals'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    project:'tsconfig.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'unused-imports'
  ],
  rules: {
    '@typescript-eslint/indent': 'warn',
    'react/function-component-definition': 'off',
    'function-paren-newline': 'off',
    'react/jsx-curly-newline': 'off',
    'no-nested-ternary': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-no-bind': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-confusing-arrow': 'off',
    'consistent-return': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'off',
    'no-continue': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
			'warn',
			{ "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
		],
    'no-shadow': 'off',
    'camelcase': 'off',
    'no-param-reassign': 'off',
    'array-callback-return': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/naming-convention': [
      "warn",
      {
        selector: 'variable',
        format: ['camelCase' ,'PascalCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      }
    ],
    '@typescript-eslint/no-empty-interface': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react+(|-native)',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
