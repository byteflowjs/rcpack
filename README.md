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
const prettier = require('@byteflowjs/prettier');

module.exports = {
  ...prettier,
  // Your rules here
};
```

To achieve `format on-save` in VSCode. In root directory, create a folder `.vscode`. Inside, create a file `settings.json`. Write:
```js
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": false,
}
```

Make sure you have the VSCode extensions *ESLint* and *Prettier* installed. Now, on file save, VSCode will automatically format your code and lint errors.

Additionally, checkout `examples/package.json` to see how to format & lint your code prior to pushing your code to repository.