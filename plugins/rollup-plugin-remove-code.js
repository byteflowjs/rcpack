/**
 * Rollup plugin to remove parts of code
 *
 */

const MagicString = require('magic-string');
const { createFilter } = require('@rollup/pluginutils');

// Example: use this plugin
// removeCode({
//   startComment: '@remove-in-prod-start',
//   endComment: '@remove-in-prod-end'
// })

// Then in your code, you have:
//
// /* @remove-in-prod-start */
// codeThatWillBeRemovedInProduction()
// /* @remove-in-prod-end */
//
// codeThatWillStayInProduction()

// Note, comment must be in /* */. It cannot use //.

function removeCode({
  startComment = 'remove_code_start',
  endComment = 'remove_code_end',
  pattern,
  include,
  exclude,
  sourceMap,
  sourcemap,
} = {}) {
  const filter = createFilter(include, exclude);

  const isSourceMapEnabled = () => {
    return sourceMap !== false && sourcemap !== false;
  };

  return {
    name: 'removeCode',

    transform(code, id) {
      if (!filter(id)) return;

      const defaultPattern = new RegExp(
        `([\\t ]*\\/\\* ?${startComment} ?\\*\\/)[\\s\\S]*?(\\/\\* ?${endComment} ?\\*\\/[\\t ]*\\n?)`,
        'g'
      );
      const result = {
        code: code.replace(pattern || defaultPattern, ''),
      };

      if (isSourceMapEnabled()) {
        const magicString = new MagicString(result.code);
        result.map = magicString.generateMap({ hires: true });
      }

      return result;
    },
  };
}

module.exports = removeCode;
