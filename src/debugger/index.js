const { DEBUG } = require('../constants');
const render = require('./render');

module.exports = (cpu) => {
  let memoryPage = 0;
  process.stdin.setEncoding('utf8');
  render(memoryPage);

  process.stdin.on('keypress', (str) => {
    if (str !== null) {
      if ((str === 's' && cpu.step()) || str === 'e' || str === 'q' || str === 'x') {
        process.exit(0);
      } else if (str === 'n' && memoryPage < DEBUG.NUM_PAGES - 1) {
        memoryPage++;
      } else if (str === 'p' && memoryPage > 0) {
        memoryPage--;
      }
      render(memoryPage);
    }
  });
}