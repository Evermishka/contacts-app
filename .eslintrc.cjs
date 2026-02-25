module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // Не нужно в React 17+
    'react/prop-types': 'off', // Мы используем TypeScript, поэтому PropTypes не нужны
    'react/display-name': 'off', // Отключаем правило display-name
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Игнорировать переменные, начинающиеся с _
    'prettier/prettier': 'error', // Ошибки форматирования считаются ошибками линтера
  },
};
