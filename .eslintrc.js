module.exports = {
  extends: [
    require.resolve('eslint-config-airbnb-base'),
  ],
  plugins: ['jest'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'no-console': ['off'],
  },
};
