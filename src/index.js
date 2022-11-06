const http = require('http');
const app = require('./app');
const { rebuildWebsiteForFile } = require('./rebuildWebsite');

const PORT = 8080;
const HOST = '0.0.0.0';

// The args that we don't care about are:
// /path/to/node
// /path/to/src/index.js
const startupParams = process.argv.filter((arg) => !arg.startsWith('/')).map((flag) => flag.split('='));
console.log('Params', startupParams);

const apiConfig = Object.fromEntries(startupParams);

http.createServer(app(apiConfig)).listen(PORT, () => {
  console.log(`fav-server listening on port http://${HOST}:${PORT}`);
  rebuildWebsiteForFile();
});
