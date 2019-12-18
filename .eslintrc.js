module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parserOptions:  {
    sourceType:  'module',
    ecmaVersion: 2018,
    project: './tsconfig.eslint.json',
  },
  rules: {
    'no-console': ['off'],
    '@typescript-eslint/explicit-function-return-type': ['off'],
  },
};
