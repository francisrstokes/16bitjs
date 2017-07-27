const fs = require('../../utils').fs;

module.exports = (asmCode) => {
  const tmpName = `${Math.random().toString(16).slice(2)}.tmp.asm`;
  return fs
    .writeFileAsync(tmpName, asmCode, 'utf8')
    .then(() => {}, console.error);
};
