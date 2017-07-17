const { MEM_SIZE } = require('../../constants');
const validator = require('./validator');
const getDataTable = require('./get-data-table');

const cleanup = require('./stages/cleanup');
const injectEntryPoint = require('./stages/inject-entry-point');
const expandPseudoInstructions = require('./stages/pseudo-instructions');
const replaceLabels = require('./stages/replace-labels');
const replaceDataLabels = require('./stages/replace-data-labels');
const evaluateExpressions = require('./stages/evaluate-expressions');


module.exports = (file) => {
  const cleanInstructions = cleanup(file);
  validator(cleanInstructions);

  const injectedEntryPoint = injectEntryPoint(cleanInstructions);
  const expandedInstructions = expandPseudoInstructions(injectedEntryPoint)
  const replacedLabels = replaceLabels(expandedInstructions);

  const dataTable = getDataTable(cleanInstructions, replacedLabels.length - 1);
  const replacedDataLabels = replaceDataLabels(replacedLabels, dataTable);

  const finalInstructions = evaluateExpressions(replacedDataLabels);

  console.log(`Read ${cleanInstructions.length} instructions, including labels.`);
  console.log(`Expanded to ${expandedInstructions.length}, including labels.`);
  console.log(`Removed labels. Final instruction count: ${replacedLabels.length}/${MEM_SIZE}`);

  return {
    instructions: finalInstructions,
    data: dataTable
  };
}