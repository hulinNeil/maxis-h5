const Px2rem = require('px2rem');

const options = {
  remUnit: 37.5,
};

module.exports = function (content, map) {
  const oldCssText = content.toString();
  const px2remIns = new Px2rem(options);
  content = px2remIns.generateRem(oldCssText);
  return this.callback(null, content, map);
};
