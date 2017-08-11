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
  const signedValue = (value << 16) >> 16;
  let out = '';
  switch (mode) {
    case 1:
      out = signedValue.toString(2);
      break;
    case 2:
      out = signedValue.toString(16);
      break;
    case 3:
      out = String.fromCharCode(signedValue);
      break;
    case 4:
      out = readStringFromMemory(signedValue, memory);
      break;

    case 0:
    default:
      out = signedValue.toString();
  }
  process.stdout.write(out);
};