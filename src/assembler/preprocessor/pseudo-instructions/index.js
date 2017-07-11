const pseudoExpanders = require('./pseudo-expanders');
const pseudoInstructions = Object.keys(pseudoExpanders);

module.exports = (acc, instruction) => {
  const ins = instruction.split(' ')[0];
  if (pseudoInstructions.indexOf(ins) > -1) {
    const expandedInstructions = pseudoExpanders[ins](instruction);
    acc.push(...expandedInstructions);
  } else {
    acc.push(instruction);
  }
  return acc;
};
