const { getConfig } = require('../config');
const { getFileList } = require('../service/manifest');
const router = require('express').Router();

/**
 * To get the list of files within an album, we need to iteratively explore the album.
 * An album is NOT the same as a folder. Albums can be virtual (like a favourites album).
 *
 * 1. So, starting at the album level, when the user presses the Get Manifest button,
 * send the current URL to this API. The file name is in the format:
 *  - index.html  = inputDir/, read all files, recursively into folders
 *  - <dir>-<subDir>.html = inputDir/dir/subDir/... all files, recursively.
 *  - Favourites-by-Folder.html = inputDir/picasa.ini, recursively
 *  - Favourites-by-Folder-<dir>-<subDir>.html = inputDir/dir/subDir/Picasa.ini, recursively
 *  - All-Favourites.html = inputDir/picasa.ini, recursively
 *
 * 2. The server uses the inputDir path as a base, and then tries to find the corresponding
 *   sub-folders that match the album name
 *
 * 3. For each matching folder, record the list of files in the folder, recursively
 *
 * 4. Add the files that were also passed in step 1
 *
 * 5. Return the list of files in plain text format, with the download directive (?)
 *   (Maybe can enhance this to be a shell script that copies the files to a
 *   destination folder argument).
 */
// Return the list of files in a folder
router.get('/', (req, res) => {
  const { path } = req.query;
  let paths = [];

  console.log('Manifest request', path);

  if (path === '/index.html') {
    paths = getFileList('', false);
  } else if (path === '/Favourites-by-Folder.html' || path === '/All-Favourites.html') {
    paths = getFileList('', true);
  } else if (path.startsWith('/Favourites-by-Folder')) {
    const subDir = path.replace('/Favourites-by-Folder-', '').replace('.html', '');
    paths = getFileList(subDir.replace(/-/g, '/'), true);
  } else {
    const subDir = path.replace('/', '').replace('.html', '');
    paths = getFileList(subDir.replace(/-/g, '/'), false);
  }

  res.json({ paths });
});

module.exports = router;
