module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true
  },
  'extends': [
    'plugin:vue/strongly-recommended',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off'
  },
  parserOptions: {
    parser: 'typescript-eslint-parser'
  }
}
