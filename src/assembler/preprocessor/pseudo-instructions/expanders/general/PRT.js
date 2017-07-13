const { unescapeCharacters } = require('../../utils');

module.exports = (instruction) => {
  const str = unescapeCharacters(instruction.replace(/^[a-zA-Z0-9]+?\s/, ''));
  const chars = str
    .slice(1, str.length - 1)
    .split('');

  const ins = chars.reduce((acc, chr) => {
    acc.push(
      `LDV A, ${chr.charCodeAt(0)}`,
      'SYS 0, A, 3'
    );
    return acc;
  }, []);

  return [
    'PSH A',
    ...ins,
    'POP A'
  ];
}