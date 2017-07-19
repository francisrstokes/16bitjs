const unescapeCharacters = (str) =>
  str
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\f/g, '\f')
    .replace(/\\b/g, '\b')
    .replace(/\\t/g, '\t')
    .replace(/\\v/g, '\v');

const getInstructionArguments = (instruction) =>
  instruction
    .split(/^[a-zA-Z0-9]+?\s/)[1]
    .split(',')
    .map(x => x.trim());

const uniqueLabel = () =>
  Math
    .random()
    .toString(16)
    .slice(2) + ':';

const getUsableRegister = (...unusableRegisters) => {
  const usableRegisters = ['B', 'C', 'D'];
  return usableRegisters
    .filter(r =>
      unusableRegisters
        .map(reg => reg.toUpperCase())
        .indexOf(r) < 0
    )[0];
}

module.exports = {
  getInstructionArguments,
  uniqueLabel,
  unescapeCharacters,
  getUsableRegister
};