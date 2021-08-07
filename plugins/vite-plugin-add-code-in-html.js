/**
 * Vite plugin to insert <script> before the ending </head> tag.
 * 
 */
const MagicString = require('magic-string');

// Options
//  - tag: 'head'
//  - position: 'begin' | 'end'
//  - body: `<script>console.log('hello')</script>` --> code to add in <script>
const addCodeInHTML = ({
  tag = 'head', 
  position = 'begin', 
  body = ''
} = {}) => {
  const transformCode = (code) => {
    const magicString = new MagicString(code);
    const useBeginTag = position === 'begin'
    const openTag = `<${tag}>`
    const endTag = `</${tag}>`
    const targetTag = useBeginTag ? openTag : endTag
    const start = code.indexOf(targetTag)
    let found = false; // flag indicating whether tag is found
    
    if (start >= 0){
      found = true;
      const end = start + targetTag.length
      let replacement = ''
      // if position is 'begin', insert right after the opening tag
      // if position is 'end', insert right before the ending tag
      if (useBeginTag){
        // ex: <head> => <head><script>hello</script>
        replacement = `${openTag}\n    ${body}`
      } else {
        // ex: </head> => <script>hello</script></head>
        replacement = `  ${body}\n  ${endTag}`
      }
      magicString.overwrite(start, end, replacement);
    }
    
    if (found) {
      return magicString.toString();
    } else {
      return null;
    }
  };
  return {
    name: 'add-code-in-html',
    transformIndexHtml(html){
      return transformCode(html)
    },
  };
};


module.exports = addCodeInHTML