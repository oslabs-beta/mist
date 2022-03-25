const { Miniflare, Log, LogLevel } = require('miniflare');
const path = require('path');
const {
  HTTPPlugin,
  convertNodeRequest,
  createServer,
  startServer,
} = require('@miniflare/http-server');
const { Log, LogLevel } = require('@miniflare/shared');
const { MemoryStorage } = require('@miniflare/storage-memory');
const http = require('http');

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

// THIS WORKS
async function serverCreator() {
  const server = await mistMiniflare.createServer();
  const plugins = await mistMiniflare.getPlugins();
  const { httpsEnabled, host, port = DEFAULT_PORT } = plugins.HTTPPlugin;
  return new Promise((resolve) => {
    server.listen(port, host, () => {
      // const log = (`this is our mistMiniflare log`, mistMiniflare.log);
      // const protocol = httpsEnabled ? 'https' : 'http';
      // log.info(`Listening on ${host ?? ''}:${port}`);
      console.log(`here is a message!`);
      console.log(`this is my port`, port);
      console.log(`this is my host`, host);

      resolve(server);
    });
  });
}

serverCreator();

// fetching localhost:8788 once
// mistMiniflare.dispatchFetch('http://localhost:8788/').then((data) => {
//   //console.log(`this is our data`, data)
//   for (let key in data) {
//     console.log(key, ':', data[key]);
//   }
// });

module.exports = mistMiniflare;
