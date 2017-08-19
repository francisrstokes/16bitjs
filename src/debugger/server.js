const http = require('http');
const createRPC = require('multiplex-rpc');
const eos = require('end-of-stream');
const wsock = require('websocket-stream');
const { DEBUG } = require('../constants');
const { encode } = require('./snapshot');

module.exports = (cpu) => {
  let memoryPage = 0

  const step = (cb) => {
    if (cpu.step()) {
      return cb(null);
    }
    return cb(null, encode(memoryPage));
  }

  const next = (cb) => {
    if (memoryPage < DEBUG.NUM_PAGES - 1) {
      memoryPage++;
    }
    cb(null, encode(memoryPage));
  }

  const previous = (cb) => {
    if (memoryPage > 0) {
      memoryPage--;
    }
    cb(null, encode(memoryPage));
  }

  const onwsock = (stream) => {
    const rpc = createRPC({ step, next, previous })
    stream.pipe(rpc).pipe(stream)

    eos(stream, er => {
      if (er) {
        console.error(er);
      }
      rpc.destroy();
      stream.destroy();
    })
  }

  const server = http.createServer((req, res) => {
    res.statusCode = 400;
    res.end();
  });


  wsock.createServer({ server }, onwsock)

  return new Promise((resolve, reject) => {
    server.listen(0, er => {
      if (er) {
        reject(er);
      } else {
        resolve(server);
      }
    })
  })
}
