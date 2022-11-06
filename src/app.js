const express = require('express');
const cors = require('cors');
const { setConfig } = require('./config');

// App
const app = express();
app.use(express.json()); // Everything is JSON (requests & responses)
app.use(cors());

// allow OPTIONS on all resources
app.options('*', cors());

// APIs -----
const favRoutes = require('./routes/favourites');
const serverRoutes = require('./routes/server');
const manifestRoutes = require('./routes/manifest');

app.use('/thumbsup', serverRoutes);
app.use('/thumbsup/fav', favRoutes);
app.use('/thumbsup/manifest', manifestRoutes);
//--------

module.exports = (apiConfig) => {
  if (apiConfig) {
    setConfig(apiConfig);
  }
  return app;
};
