const express = require('express');
const cors = require('cors');
const { Miniflare, Log, LogLevel } = require('miniflare');
const path = require('path');

const mistMiniflare = new Miniflare({
  // here we want to import and possibly decompile a client's
  //../../sample-worker-3/index.js
  scriptPath: path.resolve(__dirname, '../../sample-worker-2/index.js'),
  port: 8788,
  log: new Log(),
  globals: (function () {
    console.log('hi from mistminiflare');
  })(),
  //could we add a method to this log object that is the fetch request to 3000???
});

// mistMiniflare.log.newMethod = () => console.log(this.start);
// mistMiniflare.globals();
//mistMiniflare.log.logWithLevel(2, 'log with level method is working');
// console.log(mistMiniflare.log);

// mistMiniflare.log.prototype.testing = function () {
//   console.log('hey');
// };

// THIS WORKS
async function serverCreator() {
  const server = await mistMiniflare.startServer();
  console.log('Listening on :8788');
  return server;
}

const server = serverCreator();

// listen for the req / res objects passing through
// server.listen('/', () => {
//   // when request comes in
//   console.log('listening on 8788');
// });

// fetching localhost:8788 once
mistMiniflare.dispatchFetch('http://localhost:8788/').then((data) => {
  //console.log(`this is our data`, data)
  for (let key in data) {
    console.log(key, ':', data[key]);
  }
});

module.exports = mistMiniflare;
