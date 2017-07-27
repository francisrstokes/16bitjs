const loopEnd = require('./asm/loop-end');
let generatedAsm = require('./asm/header');
let labelPointer = 0;

const isBranch = (element) => Object.prototype.toString.call(element) === '[object Array]';

const nextLabel = () => `b${++labelPointer}:`;
const currentLabel = () => `b${labelPointer}:`;
const call = (functionName) => `ldv A, ${functionName}\ncal A\n`;

const compileBranch = (branch, branchLevel) => {
  for (let i = 0; i < branch.length; i++) {
    // End of file?
    if (branchLevel === 0 && i === branch.length - 1) return;

    if (isBranch(branch[i])) {
      generatedAsm += `${nextLabel()}\n`;
      compileBranch(branch[i], branchLevel + 1);
    } else {
      // Regular statement
      switch (branch[i]) {
        case '+':
          generatedAsm += call('inc_mem_ptr:');
          break;
        case '-':
          generatedAsm += call('dec_mem_ptr:');
          break;
        case '>':
          generatedAsm += call('inc_ptr:');
          break;
        case '<':
          generatedAsm += call('dec_ptr:');
          break;
        case ',':
          generatedAsm += call('input:');
          break;
        case '.':
          generatedAsm += call('output:');
          break;
      }
    }
    // End of a branch?
    if (i === branch.length - 1) {
      generatedAsm += loopEnd(currentLabel());
    }
  }
}

module.exports = (tree) => {
  console.log(tree)
  compileBranch(tree, 0);
  generatedAsm += 'hlt\n';
  return generatedAsm;
};
