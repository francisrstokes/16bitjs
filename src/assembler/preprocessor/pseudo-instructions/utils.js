const unescapeCharacters = (str) =>
  str
    .replace('\\n', '\n')
    .replace('\\r', '\r')
    .replace('\\f', '\f')
    .replace('\\b', '\b')
    .replace('\\t', '\t')
    .replace('\\v', '\v');

const getInstructionArguments = (instruction) =>
  instruction
    .split(/^[a-zA-Z0-9]+?\s/)[1]
    .split(',')
    .map(x => x.trim());

const uniqueLabel = () =>
  ':' + Math
    .random()
    .toString(16)
    .slice(2);

module.exports = {
  getInstructionArguments,
  uniqueLabel,
  unescapeCharacters
};