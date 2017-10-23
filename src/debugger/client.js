const http = require('http');
const createRPC = require('multiplex-rpc');
const wsock = require('websocket-stream');
const eos = require('end-of-stream');
const { decode } = require('./snapshot');

const methods = ['step', 'next', 'previous', 'reset'];

module.exports = (server) => {
  let whref = server;
  if (whref instanceof http.Server) {
    whref = 'ws://localhost:' + whref.address().port;
  }

  const ws = wsock(whref);
  const rpc = createRPC();
  const plex = rpc.wrap(methods);

  ws.pipe(rpc).pipe(ws);

  eos(ws, er => {
    if (er) {
      console.error(er);
    }
    rpc.destroy();
  })

  return {
    close: () => {
      ws.end();
    },
    reset: () => new Promise(res => plex.reset(() => res())),
    step: () => {
      return new Promise((resolve, reject) => {
        plex.step((er, res) => {
          if (er) {
            return reject(er);
          }
          if (typeof res === 'object' && res !== null && res.type === 'Buffer' && Array.isArray(res.data)) {
            return resolve(decode(new Buffer(res.data)));
          }
          return resolve();
        })
      })
    }
  }
}
