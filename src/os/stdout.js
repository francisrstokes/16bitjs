module.exports = (value, mode) => {
  switch (mode) {
    case 1:
      process.stdout.write(value.toString(2));
      break;
    case 2:
      process.stdout.write(value.toString(16));
      break;
    case 3:
      process.stdout.write(String.fromCharCode(value));
      break;
    case 0:
    default:
      process.stdout.write(value.toString());
  }
};