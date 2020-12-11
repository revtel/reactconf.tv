module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: ['react-app'],
  plugins: ['prettier'],
  rules: {
    'one-var': 'off',
    'no-multi-assign': 'off',
    'no-nested-ternary': 'off',
    'global-require': 'off',
    'prettier/prettier': 'error',
  },
};
