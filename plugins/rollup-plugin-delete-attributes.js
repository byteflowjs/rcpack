/**
 * Rollup plugin to delete React attributes from code
 *
 */

const MagicString = require('magic-string');
const { createFilter } = require('@rollup/pluginutils');

// Options
//  - include: [/.*\.js/] --> array of regex specifying files to operate on
//  - exclude: [/node_modules/] --> array of regex specifying files to ignore
//  - removeHtmlAttrs: ['data-mock', 'data-test-id'] --> attributes to be deleted
//  - replacement: [{from: 'foo', to: 'bar}] ==> list of {from, to} object describing replacement
//  - onlyInEnv: ['production'] --> enable only in these environments, omit this field to enable in all environments
const deleteAttributes = (options = {}) => {
  options.include = options.include ?? [/.*\.jsx/];
  options.exclude = options.exclude ?? [/node_modules/];
  const filter = createFilter(options.include, options.exclude);

  const isSourceMapEnabled = () => {
    return options.sourceMap !== false && options.sourcemap !== false;
  };

  const shouldUse = (id) => {
    const argsOk =
      options.removeHtmlAttrs?.length || options.replacement?.length;
    const envOk =
      typeof options.onlyInEnv === 'undefined'
        ? true
        : options.onlyInEnv.includes(process.env.NODE_ENV);
    const pathOk = filter(id);
    return argsOk && envOk && pathOk;
  };

  const transformCode = (code) => {
    const magicString = new MagicString(code);
    let found = false; // flag indicating whether any replacement is done

    const doReplacement = (patternOrString, replaceWith = '') => {
      const pattern =
        patternOrString instanceof RegExp
          ? patternOrString
          : new RegExp(patternOrString, 'g');
      let match;

      while ((match = pattern.exec(code))) {
        found = true;
        const matchedString = match[0];
        const start = match.index;
        const end = start + matchedString.length;
        magicString.overwrite(start, end, replaceWith);
      }
    };

    // remove html attributes
    if (options.removeHtmlAttrs) {
      doReplacement(
        new RegExp(`"(${options.removeHtmlAttrs.join('|')})": ?".*?",?`, 'gi'),
        ''
      );
    }

    // replace plain strings
    if (options.replacement) {
      options.replacement.forEach((obj) => {
        doReplacement(obj.from, obj.to);
      });
    }

    if (found) {
      const result = { code: magicString.toString() };
      if (isSourceMapEnabled()) {
        result.map = magicString.generateMap({ hires: true });
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

module.exports = deleteAttributes;
