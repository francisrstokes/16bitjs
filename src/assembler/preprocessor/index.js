const {
  extractLabels,
  replaceLabels
 } = require('./extract-labels');
const expandPseudoInstructions = require('./pseudo-instructions');
const evaluateExpressions = require('./evaluate-expressions');

module.exports = (file) =>
  file
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '' && line[0] !== '#')
    .reduce(expandPseudoInstructions, [])
    // .map(x => { console.log(x); return x; })
    .filter(extractLabels)
    .map(replaceLabels)
    .map(evaluateExpressions);