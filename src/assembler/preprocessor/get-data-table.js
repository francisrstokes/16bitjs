const {
  DIRECT_ASSIGNMENT,
  BUFFER_ASSIGNMENT,
  STRING_ASSIGNMENT
} = require('../../constants');
const { unescapeCharacters } = require('./utils');

const validateDataLabel = (label) => {
  if (label[0] !== '.') {
    console.log(`Invalid data label name ${label}. Must start with a '.'. Exitiing...`);
    process.exit(1);
  }
};

let dataOffset = 0;
const getAddress = (size, memoryOffset) => {
  const totalOffset = memoryOffset + dataOffset;
  dataOffset += size;
  return totalOffset;
}

module.exports = (dataSection, memoryOffset) =>
  dataSection.reduce((acc, cur) => {
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
    } else if (parts.length === 3) {
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
        const str = parts[2]
          .split('')
          .slice(1, parts[2].length - 1)
          .join('');
        const data = unescapeCharacters(str);
        const dataSize = data.length + 1;

        acc[label] = {
          type: STRING_ASSIGNMENT,
          size: dataSize,
          address: getAddress(dataSize, memoryOffset),
          data
        };
      } else {
        console.log(`Unsupported data declaraction:\n${cur}\nExiting...`);
        process.exit(1);
      }
    } else {
      console.log(`Unsupported data declaraction:\n${cur}\nExiting...`);
      process.exit(1);
    }

    return acc;
  }, {});
