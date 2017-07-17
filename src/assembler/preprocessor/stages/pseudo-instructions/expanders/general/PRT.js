const { unescapeCharacters } = require('../../../../utils');

module.exports = (instruction) => {
  const str = unescapeCharacters(instruction.replace(/^[a-zA-Z0-9]+?\s/, ''));
  const chars = str
    .slice(1, str.length - 1)
    .split('');

  const ins = chars.reduce((acc, chr) => {
    acc.push(
      `LDV B, ${chr.charCodeAt(0)}`,
      'SYS'
    );
    return acc;
  }, []);

  return [
    'PSH A',
    'PSH B',
    'PSH C',

    'LDV A, 0',
    'LDV C, 3',
    ...ins,

    'POP C',
    'POP B',
    'POP A'
  ];
}