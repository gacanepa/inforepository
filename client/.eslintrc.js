module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  root: true,
  plugins: ['react'],
  rules: {
    'arrow-parens': ['warn', 'as-needed'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'comma-dangle': ['warn', 'only-multiline'],
    'no-unused-vars': ['warn', { args: 'all', argsIgnorePattern: '^_' }],
    'max-len': ['warn', { code: 100 }],
  },
};
