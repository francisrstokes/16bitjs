const readStringFromMemory = (startAddress, memory) => {
  let address = startAddress;
  const strBuffer = [];
  while (memory[address] !== 0) {
    strBuffer.push(memory[address++]);
  }
  return strBuffer
    .map(x => String.fromCharCode(x))
    .join('');
};

module.exports = (value, mode, memory) => {
  let out = '';
  switch (mode) {
    case 1:
      out = value.toString(2);
      break;
    case 2:
      out = value.toString(16);
      break;
    case 3:
      out = String.fromCharCode(value);
      break;
    case 4:
      out = readStringFromMemory(value, memory);
      break;

    case 0:
    default:
      out = value.toString();
  }
  process.stdout.write(out);
};