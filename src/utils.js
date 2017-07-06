module.exports = {
  bin: (n) => n.toString(2),
  padHex: (hex) => {
    if (hex.length < 4) {
      return Array.apply(null, {length: 4-hex.length}).reduce((padding) => padding + '0', '') + hex;
    }
    return hex;
  }
};