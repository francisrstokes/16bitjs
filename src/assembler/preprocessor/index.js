const {
  extractLabels,
  replaceLabels
 } = require('./extract-labels');
const expandPseudoInstructions = require('./pseudo-instructions');
const evaluateExpressions = require('./evaluate-expressions');

const mapIntercept = (func) =>
  (val, index, collection) => {
    if (index === 0) func(val, index, collection);
    return val;
  };

module.exports = (file) =>
  file
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '' && line[0] !== '#')
    .map(mapIntercept((instruction, index, instructions) => console.log(`Read ${instructions.length} instructions, including labels.`)))
    .reduce(expandPseudoInstructions, [])
    .map(mapIntercept((instruction, index, instructions) => console.log(`Expanded to ${instructions.length}, including labels.`)))
    .filter(extractLabels)
    .map(mapIntercept((instruction, index, instructions) => console.log(`Removed labels. Final instruction count: ${instructions.length}`)))
    .map(replaceLabels)
    .map(evaluateExpressions);
