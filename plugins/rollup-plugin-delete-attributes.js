/**
 * Rollup plugin to delete React attributes from code
 * 
 */

const MagicString = require('magic-string');
const {createFilter} = require('@rollup/pluginutils');


// Options
//  - include: [/.*\.js/] --> array of regex specifying files to operate on
//  - exclude: [/node_modules/] --> array of regex specifying files to ignore
//  - attrs: ['data-mock', 'data-test-id'] --> attributes to be deleted
//  - onlyInEnv: ['production'] --> enable only in these environments, omit this field to enable in all environments
const deleteAttributes = (options = {}) => {
  options.include = options.include ?? [/.*\.jsx/];
  options.exclude = options.exclude ?? [/node_modules/];
  const filter = createFilter(options.include, options.exclude);

  const isSourceMapEnabled = () => {
    return options.sourceMap !== false && options.sourcemap !== false;
  };

  const shouldUse = (id) => {
    const envOk =
      typeof options.onlyInEnv === 'undefined'
        ? true
        : options.onlyInEnv.includes(process.env.NODE_ENV);
    const pathOk = filter(id);
    return options.attrs?.length && envOk && pathOk;
  };

  const transformCode = (code) => {
    const magicString = new MagicString(code);
    const pattern = new RegExp(`"(${options.attrs.join('|')})": ?".*?",?`, 'gi');
    let found = false; // flag indicating whether provided attribute is found in code
    let match;

    while ((match = pattern.exec(code))) {
      found = true;
      const matchedString = match[0];
      const start = match.index;
      const end = start + matchedString.length;
      const replacement = '';
      magicString.overwrite(start, end, replacement);
    }

    if (found) {
      const result = {code: magicString.toString()};
      if (isSourceMapEnabled()) {
        result.map = magicString.generateMap({hires: true});
      }
      return result;
    } else {
      return null;
    }
  };

  return {
    name: 'delete-attributes',

    renderChunk(code, chunk) {
      const id = chunk.fileName;
      if (!shouldUse(id)) return null;
      return transformCode(code, id);
    },

    transform(code, id) {
      if (!shouldUse(id)) return null;
      return transformCode(code, id);
    },
  };
};

module.exports = deleteAttributes