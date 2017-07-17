const { MEM_SIZE } = require('../../constants');
const validator = require('./validator');
const {
  extractLabels,
  replaceLabels
 } = require('./extract-labels');

const {
  extractDataSection,
  extractTextSection,
  getDirectiveIndexes
} = require('./extract-sections');
const getDataTable = require('./get-data-table');
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

  validator(cleanInstructions);
  const dataSection = extractDataSection(cleanInstructions);
  const textSection = extractTextSection(cleanInstructions);
  const entryPoint = textSection[0].split(' ')[1];

  const removedDirectives = (() => {
    const directiveIndexes = getDirectiveIndexes(cleanInstructions);
    return (directiveIndexes.data < directiveIndexes.text)
      ? cleanInstructions.slice(directiveIndexes.text + 2, cleanInstructions.length)
      : cleanInstructions.slice(directiveIndexes.text + 2, directiveIndexes.data);
  })();

  const injectedEntryPoint = [
    `ldv a, ${entryPoint}`,
    'jmr a',
    ...removedDirectives
  ];

  const expandedInstructions = expandPseudoInstructions(injectedEntryPoint)
    .map(mapIntercept((instruction, index, instructions) => console.log(`Expanded to ${instructions.length}, including labels.`)));

  const replacedLabels = expandedInstructions
    .filter(extractLabels)
    .map(replaceLabels)
    .map(mapIntercept((instruction, index, instructions) => console.log(`Removed labels. Final instruction count: ${instructions.length}/${MEM_SIZE}`)));

  const dataTable = getDataTable(dataSection, replacedLabels.length - 1);
  const dataLabels = Object.keys(dataTable).sort();
  const replacedDataLabels = replacedLabels
    .map(instruction => {
      return dataLabels
        .reduce((acc, cur) => {
          const labelRegex = new RegExp(cur, 'g');
          return acc.replace(labelRegex, dataTable[cur].address);
        }, instruction);
    });

  const finalInstructions = replacedDataLabels.map(evaluateExpressions);

  return {
    instructions: finalInstructions,
    data: dataTable
  };
}