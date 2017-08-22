const chai = require('chai');
const expect = chai.expect;

const browserify = require('browserify');
const vm = require('vm');
const brfs = require('brfs');

describe('snapshot', () => {
  it('encode/decode xor-swap', done => {
    const b = browserify()
    b.add(__dirname + '/snapshot.js');
    b.transform(brfs);
    b.bundle((err, src) => {
      if (err) {
        throw err;
      }

      const assert = (a, b) => {
        expect(a).to.deep.equal(b);
      }

      vm.runInNewContext(src, { done, assert, console: { log: () => { } } })

    });
  });
})
