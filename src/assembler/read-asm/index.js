const fs = require('../../utils').fs;
const sanityCheck = require('./sanity-check');

module.exports = (argv) =>
  sanityCheck(argv).then(() => fs.readFileAsync(argv.i, 'utf8'));