<!-- @format -->

# RCPack

This package provides a collection of reasonable default prettier, eslint files for fast-paced JS development.


## Pre-requisite

Make sure you have the following VSCode extensions installed:
- ESLint
- Prettier


## Option 1: Auto-install

In your project folder:
```
npm i -D @byteflowjs/rcpack && npx rcpack create
```

This will generate the following files in your project (overwrite existing ones):
```
my-app
├── .eslintrc.js
├── .eslintignore
├── .prettierrc.js
├── .prettierignore
├── .vscode
│   └── settings.json
```

You may need to reload VSCode for extensions to use these configs. 

Now, VSCode automatically shows lint issues for all `currently opened tabs` only (on the bottom bar). To lint all files in the project, in editor:
 >- Hit `cmd+p`
 >- Type `>run task`
 >- Choose `eslint: lint whole folder`

If for some reason, you want to delete these files...
```
npx rcpack delete
```


## Option 2: Manual install

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

We need to reload VSCode to so ESLint and Prettier extensions take effect. `cmd+shift+p` and type `reload window`. 

Now, on file save, VSCode will automatically format your code and lint errors.


## Format & lint pre-commit

In `examples/package.json`, check `devDependencies` and `script` section to see an example of how to *format code* & *lint out the errors* prior to pushing your code to repository.