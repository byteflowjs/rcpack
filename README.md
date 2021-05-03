<!-- @format -->

# RCPack

This package provides a collection of reasonable default prettier, eslint files for fast-paced JS development.

# How to Use

First, install the package as dev dependency.
```
npm i -D @byteflowjs/rcpack
```

In your `.eslintrc.js` file, write:

```js
module.exports = {
  extends: [require.resolve('@byteflowjs/eslint')],
  rules: {
    // Your rules here
  },
};
```

In your `.prettierrc.js` file, write:

```js
const prettier = require('@byteflowjs/eslint');

module.exports = {
  ...prettier,
  // Your rules here
};
```