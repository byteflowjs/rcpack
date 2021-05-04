<!-- @format -->

# RCPack

This package provides a collection of reasonable default prettier, eslint files for fast-paced JS development.


## Requirement

Make sure you have the VSCode extensions *ESLint* and *Prettier* installed.



## Automatically Install

This installs the package as a dev dependency, and creates the necessary `eslint` and `prettier` rc files in the root directory.
```
npm i -D @byteflowjs/rcpack && npx rcpack generate
```

If you want to delete these files.
```
npx rcpack delete
```


## Manually Install

Install the package as a dev dependency.
```
npm i -D @byteflowjs/rcpack
```

In your `.eslintrc.js` file, write:

```js
module.exports = {
  extends: [require.resolve('@byteflowjs/rcpack/eslint')],
  rules: {
    // Your rules here
  },
};
```

In your `.prettierrc.js` file, write:

```js
const prettier = require('@byteflowjs/rcpack/prettier');

module.exports = {
  ...prettier,
  // Your rules here
};
```

To achieve `format on-save` in VSCode. In root directory, create a `.vscode` folder. Inside, create a `settings.json` file. Write:
```js
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": false,
  "eslint.lintTask.enable": true
}
```

We need to reload VSCode to so ESLint and Prettier extensions take effort. `cmd+shift+p` and type `reload window`. 

Now, on file save, VSCode will automatically format your code and lint errors.


## Format & lint pre-commit

In `examples/package.json`, check `devDependencies` and `script` section to see an example of how to *format code* & *lint out the errors* prior to pushing your code to repository.