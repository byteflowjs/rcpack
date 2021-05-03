/**
 * Rules: https://eslint.org/docs/rules/
 *
 */
 module.exports = {
    // Determine which global variables are allowed
    env: {
      browser: true,
      es2021: true, // ES2021 globals are allowed, ex: window.WeakRef;
      // This also sets the ecmaVersion parser option to 12, so ES12 features are being recognized
      node: true, // Node globals are allowed, ex: global.process
      jest: true,
    },
  
    // Change default ESLints's parser to Babel's parser. Reason is 
    // ESLint's default parser and core rules only support the latest 
    // final ECMAScript standard and do not support experimental (such
    // as new features like "let a ??= 1") and non-standard syntax 
    // provided by Babel.
    // https://www.npmjs.com/package/@babel/eslint-parser
    parser: '@babel/eslint-parser',
  
    // Specify the language options (syntax) we want to support
    parserOptions: {
      ecmaFeatures: {
        jsx: true, // Enable JSX
      },
      babelOptions: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [],
      },
      requireConfigFile: false,
      sourceType: 'module', // Code in ES Module
    },
  
    // Specifies the rules (configs) to use
    extends: [
      'eslint-config-airbnb-base',
      'plugin:react/recommended',
      'prettier',
    ],
  
    // A plugin creates additional rules. It also provides some
    // config we can apply. We then choose which configs to apply
    // in "extends".
    //  - This property is is merely a flag to enable a given plugin
    //    after installation with npm i.
    //  - After putting the npm package here, we now can refer to
    //    the plugin's rules (in "rules" section), or refer to its 
    //    configs (in "extends" section).
    plugins: [
      'react',
      'react-hooks',
    ],
  
    rules: {
      'react/display-name': 0,
      'react/prop-types': 0,
      'react/forbid-prop-types': 0,
      'react/react-in-jsx-scope': 0,
      'react/destructuring-assignment': 0,
      'react/jsx-filename-extension': 0,
      'react/jsx-one-expression-per-line': 0,
      'react-hooks/rules-of-hooks': 'error', // Enforce hooks rules
      'react-hooks/exhaustive-deps': 'warn', // Look out for hooks dependencies
      // 'import/no-unresolved': 0,
      'import/order': 0,
      'import/no-named-as-default': 0,
      'import/no-cycle': 0,
      'import/prefer-default-export': 0,
      'import/no-default-export': 0,
      'import/no-extraneous-dependencies': 0,
      'import/no-named-as-default-member': 0,
      'import/no-duplicates': 0,
      'import/no-self-import': 0,
      'import/extensions': 0,
      'import/no-useless-path-segments': 0,
      // unnecessary rules
      'sort-imports': 0,
      'linebreak-style': 0,
      'no-prototype-builtins': 'off',
      'no-shadow': 0,
      'prefer-const': 0,
      'no-restricted-syntax': 0,
      'no-cond-assign': 0,
      'no-param-reassign': 0,
      'guard-for-in': 0,
      'no-unused-vars': 0,    
    },
  
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
        },
      },
      'import/extensions': ['.js', '.jsx'],
    },
  };
  