const { unescapeCharacters } = require('../../utils');

module.exports = (instruction) => {
  const str = unescapeCharacters(instruction.replace(/^[a-zA-Z0-9]+?\s/, ''));
  const chars = str
    .slice(1, str.length - 1)
    .split('');

  const ins = chars.reduce((acc, chr) => {
    acc.push(
      `LDV A, ${chr.charCodeAt(0)}`,
      'OUT 3, A'
    );
    return acc;
  }, []);

  return [
    'PSH A',
    ...ins,
    'POP A'
  ];
}