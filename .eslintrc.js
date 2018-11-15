// const isDev = process.env.NODE_ENV === 'development'
module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true
  },
  'extends': [
    'plugin:vue/strongly-recommended',
    '@vue/standard'
  ],
  rules: {
    'padded-blocks': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/html-quotes': 'error',
    'vue/no-confusing-v-for-v-if': 'error',
    'vue/order-in-components': 'error',
    'vue/this-in-template': 'error',
    'vue/html-closing-bracket-newline': 'error',
    'vue/html-closing-bracket-spacing': 'error',
    'vue/no-use-v-if-with-v-for': 'error',
    'vue/prop-name-casing': 'error'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
