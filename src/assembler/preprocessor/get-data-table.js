const {
  DIRECT_ASSIGNMENT,
  BUFFER_ASSIGNMENT,
  STRING_ASSIGNMENT
} = require('../../constants');
const { unescapeCharacters } = require('./utils');
const { extractDataSection } = require('./extract-sections');

const validateDataLabel = (label) => {
  if (label[0] !== '.') {
    throw new Error(`Invalid data label name ${label}. Must start with a '.'. Exitiing...`);
  }
};

module.exports = (instructions, memoryOffset) => {
  let dataOffset = 0;

  const getAddress = (size, memoryOffset) => {
    const totalOffset = memoryOffset + dataOffset;
    dataOffset += size;
    return totalOffset;
  }

  const dataSection = extractDataSection(instructions);
  return dataSection.reduce((acc, cur) => {
    const parts = cur.split(' ');
    const label = parts[0];
    validateDataLabel(label);

    // Direct assignment
    if (parts.length === 2) {
      const data = (parts.length === 2)
        ? parseInt(parts[1])
        : 0;

      acc[label] = {
        type: DIRECT_ASSIGNMENT,
        size: 1,
        address: getAddress(1, memoryOffset),
        data
      };
    } else if (parts.length >= 3) {
      // Buffer assignment
      if (parts[1] === 'size') {
        const bufSize = parseInt(parts[2]);
        acc[label] = {
          type: BUFFER_ASSIGNMENT,
          size: bufSize,
          address: getAddress(bufSize, memoryOffset),
          data: bufSize
        };
      } else if (parts[1] === 'string') {
        const str = cur.split(/^\.[a-zA-Z0-9_]+? [a-zA-Z0-9_]+? /)[1];
        const trimmed = str
          .split('')
          .slice(1, str.length - 1)
          .join('');
        const data = unescapeCharacters(trimmed);
        const dataSize = data.length + 1;

        acc[label] = {
          type: STRING_ASSIGNMENT,
          size: dataSize,
          address: getAddress(dataSize, memoryOffset),
          data
        };
      } else {
        throw new Error(`Unsupported data declaraction:\n${cur}\nExiting...`);
      }
    } else {
      throw new Error(`Unsupported data declaraction:\n${cur}\nExiting...`);
    }
    return acc;
  }, {});
}
