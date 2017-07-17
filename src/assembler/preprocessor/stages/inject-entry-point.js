const {
  extractTextSection,
  getDirectiveIndexes
} = require('../extract-sections');

module.exports = (instructions) => {
  const textSection = extractTextSection(instructions);
  const directiveIndexes = getDirectiveIndexes(instructions);
  const entryPoint = textSection[0].split(' ')[1];

  const removedDirectives = (directiveIndexes.data < directiveIndexes.text)
    ? instructions.slice(directiveIndexes.text + 2, instructions.length)
    : instructions.slice(directiveIndexes.text + 2, directiveIndexes.data);

  const injectedEntryPoint = [
    `ldv a, ${entryPoint}`,
    'jmr a',
    ...removedDirectives
  ];

  return injectedEntryPoint;
};