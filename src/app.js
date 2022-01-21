const express = require('express');
const cors = require('cors');
const { join } = require('path');

const updatePicasa = require('./updatePicasa');
const { getConfig, setConfig } = require('./config');
const { rebuildWebsiteForFile } = require('./rebuildWebsite');

// App
const app = express();
app.use(express.json()); // Everything is JSON (requests & responses)
app.use(cors());

// allow OPTIONS on all resources
app.options('*', cors());

// APIs
app.get('/thumbsup', (req, res) => {
  console.log('route /');
  res.send({ data: 'Fav-server is running' });
});

// Update the favourite-state
/**
 * Request body: { isFav: boolean, path: string, file: string }
 */
app.post('/thumbsup', (req, res) => {
  console.log('Received', req.body);
  const { isFav, path, file } = req.body;

  const result = updatePicasa({ isFav, path, file, inputDir: getConfig().inputDir });
  console.log('path', path);
  console.log('file', file);

  rebuildWebsiteForFile(join(path)); // This will spawn a process, but we can call it lots of times because it uses debounce

  if (result) {
    res.json({ status: 'updated' });
  } else {
    res.status(500).json({ status: 'not updated' });
  }
});

app.get('/thumbsup/rebuild', (req, res) => {
  rebuildWebsiteForFile(); // This will spawn a process, but we can call it lots of times because it uses debounce

  res.json({ status: 'updated' });
});

module.exports = (apiConfig) => {
  setConfig(apiConfig);

  return app;
};
