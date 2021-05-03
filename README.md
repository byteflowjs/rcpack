<!-- @format -->

# RCPack

This package provides a collection of reasonable default prettier, eslint files for fast-paced JS development.

# How to Use

In your `.eslintrc.js` file:

```js
module.exports = {
  extends: [require.resolve('@byteflowjs/eslint')],
  rules: {
    // Your rules here
  },
};
```

In your `.prettierrc.js` file:

```js
const prettier = require('@byteflowjs/eslint');

module.exports = {
  ...prettier,
  // Your rules here
};
```
