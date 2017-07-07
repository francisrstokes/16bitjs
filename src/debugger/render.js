const logState = require('./log-state');

module.exports = () => {
  logState();
  process.stdout.write('(s)tep (e)xit >>> ');
};