/**
 * Vite plugin to insert <script> before the ending </head> tag.
 * 
 */
const MagicString = require('magic-string');

// Options
//  - tagAttrs: {src: '/assets/lol.js'} --> attributes on the <script> tag
//  - code: `console.log('hello')` --> code to add in <script>
const appendScriptBeforeEndingHead = (options = {}) => {
  const transformCode = (code) => {
    const magicString = new MagicString(code);
    const tag = '</head>'
    let found = false; // flag indicating whether provided attribute is found in code
    const start = code.indexOf(tag)
    if (start >= 0){
      found = true;
      const end = start + tag.length
      let htmlAttrs = ''
      for (const [k, v] of Object.entries(options.tagAttrs ?? {})){
        htmlAttrs += ` ${k}="${v}"`
      }
      const replacement = `  <script${htmlAttrs}>${options.code}</script>\n  </head>`
      magicString.overwrite(start, end, replacement);
    }
    if (found) {
      return magicString.toString();
    } else {
      return null;
    }
  };
  return {
    name: 'append-script-before-ending-head',
    transformIndexHtml(html){
      return transformCode(html)
    },
  };
};
module.exports = appendScriptBeforeEndingHead