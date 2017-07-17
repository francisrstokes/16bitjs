const { MEM_SIZE } = require('../../constants');
const {
  extractLabels,
  replaceLabels
 } = require('./extract-labels');
const expandPseudoInstructions = require('./pseudo-instructions');
const evaluateExpressions = require('./evaluate-expressions');

const removeWhitespace = line => line.trim();
const removeComments = line => line.split(';')[0];
const removeEmptyLines = line => line !== '';

const mapIntercept = (func) =>
  (val, index, collection) => {
    if (index === 0) func(val, index, collection);
    return val;
  };

module.exports = (file) => {
  const cleanInstructions = file
    .split('\n')
    .map(removeWhitespace)
    .map(removeComments)
    .filter(removeEmptyLines)
    .map(mapIntercept((instruction, index, instructions) => console.log(`Read ${instructions.length} instructions, including labels.`)));

  const expandedInstructions = expandPseudoInstructions(cleanInstructions)
    .map(mapIntercept((instruction, index, instructions) => console.log(`Expanded to ${instructions.length}, including labels.`)));

  return expandedInstructions
    .filter(extractLabels)
    .map(mapIntercept((instruction, index, instructions) => console.log(`Removed labels. Final instruction count: ${instructions.length}/${MEM_SIZE}`)))
    .map(replaceLabels)
    .map(evaluateExpressions);
}