const argv = require('yargs').argv;
const { DEBUG } = require('../constants');
const render = require('./render');

module.exports = (cpu) => {
  let memoryPage = 0;
  process.stdin.setEncoding('utf8');

  if (argv.pauseAfter) {
    const target = parseInt(argv.pauseAfter);
    for (let i = 0; i < target; i++) {
      cpu.step();
    }
  }

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