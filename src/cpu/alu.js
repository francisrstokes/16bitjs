const {
  REGISTERS,
  ARITHMETIC
} = require('../constants');

const decodeAluArguments = (high8, rs, rd) => {
  const arithmeticOperation = high8 & 0b00001111;
  const resultMode = high8 & 0b00010000;
  const shiftAmount = high8 & 0b11100000;
  const resultRegister = (resultMode === ARITHMETIC.DESTINATION_MODE)
    ? rd
    : rs;
  return [
    arithmeticOperation,
    resultRegister,
    shiftAmount
  ];
}

const result = new Uint16Array(1);

module.exports = (registers, rs, rd, high8) => {
  const [
    arithmeticOperation,
    resultRegister,
    shiftAmount
  ] = decodeAluArguments(high8, rs, rd);

  switch (arithmeticOperation) {
    case ARITHMETIC.ADD:
      result[0] = registers[REGISTERS[rd]] + registers[REGISTERS[rs]];
      break;
    case ARITHMETIC.SUB:
      result[0] = registers[REGISTERS[rd]] - registers[REGISTERS[rs]];
      break;
    case ARITHMETIC.MUL:
      result[0] = registers[REGISTERS[rd]] * registers[REGISTERS[rs]];
      break;
    case ARITHMETIC.DIV:
      result[0] = Math.floor(registers[REGISTERS[rd]] / registers[REGISTERS[rs]]);
      break;
    case ARITHMETIC.INC:
      registers[REGISTERS[rd]]++;
      return;
    case ARITHMETIC.DEC:
      registers[REGISTERS[rd]]--;
      return;

    case ARITHMETIC.LSF:
      result[0] = registers[REGISTERS[rd]] << shiftAmount;
      break;
    case ARITHMETIC.RDF:
      result[0] = registers[REGISTERS[rd]] >> shiftAmount;
      break;
    case ARITHMETIC.AND:
      result[0] = registers[REGISTERS[rs]] & registers[REGISTERS[rd]];
      break;
    case ARITHMETIC.OR:
      result[0] = registers[REGISTERS[rs]] | registers[REGISTERS[rd]];
      break;
    case ARITHMETIC.XOR:
      result[0] = registers[REGISTERS[rs]] ^ registers[REGISTERS[rd]];
      break;
    case ARITHMETIC.NOT:
      result[0] = ~registers[REGISTERS[rs]];
      break;
  }

  registers[REGISTERS[resultRegister]] = result[0];
};
