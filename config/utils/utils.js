const path = require('path');

const encodeObjectValue = obj => {
  const newObj = {};
  for (let key in obj) {
    newObj[key] = JSON.stringify(obj[key]);
  }
  return newObj;
};

module.exports = { encodeObjectValue };
