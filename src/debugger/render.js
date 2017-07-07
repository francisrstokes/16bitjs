const logState = require('./log-state');

module.exports = (cpu) => {
  logState();
  process.stdout.write('(s)tep (e)xit >>> ');
};