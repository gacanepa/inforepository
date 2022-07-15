module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': [
      'error',
      { js: 'always' },
    ], // Required to allow importing .js files (because of 'type': 'module' in package.json)
    'arrow-parens': ['warn', 'as-needed'],
  },
};
