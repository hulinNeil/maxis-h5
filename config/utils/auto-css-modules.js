const { extname } = require('path');
const CSS_EXTNAME = ['.css', '.scss', '.sass', '.less'];

module.exports = () => {
  return {
    visitor: {
      ImportDeclaration(path) {
        const { specifiers, source } = path.node;
        const { value } = source;
        if (specifiers.length > 0 && CSS_EXTNAME.includes(extname(value))) {
          source.value = `${value}?css_modules`; // The path add 'css_modules', for webpack matching files
        }
      },
    },
  };
};
