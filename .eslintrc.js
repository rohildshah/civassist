module.exports = {
  root: true,
  lintOnSave: false,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    "quotes": [2, "double", "avoid-escape"],
    "space-before-function-paren": ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always'
    }]
  },
}
