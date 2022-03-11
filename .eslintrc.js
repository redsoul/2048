module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': [2, { code: 120, tabWidth: 4, ignoreUrls: true }],
    'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }]
  },
  ignorePatterns: ['backend/*'],
};
