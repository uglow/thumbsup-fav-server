const router = require('express').Router();
const updatePicasa = require('../updatePicasa');
const { getConfig } = require('../config');
const { rebuildWebsiteForFile } = require('../rebuildWebsite');
const { join } = require('path');

// Update the favourite-state
/**
 * Request body: { isFav: boolean, path: string, file: string }
 */
router.post('/', (req, res) => {
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

router.get('/rebuild', (req, res) => {
  rebuildWebsiteForFile(); // This will spawn a process, but we can call it lots of times because it uses debounce

  res.json({ status: 'updated' });
});

module.exports = router;
