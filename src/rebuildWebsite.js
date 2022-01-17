const { exec } = require('child_process');
const { getConfig } = require('./config');
const debounce = require('debounce');

let fileQueue = [];
let isRebuilding = false;
const rebuildWebsite = debounce(doRebuild, 3000, false);

function rebuildWebsiteForFile(filename = '') {
  if (filename) {
    fileQueue.push(filename);
  }

  if (!isRebuilding) {
    rebuildWebsite();
  }
}

function doRebuild() {
  const { rebuildCmd, incremental } = getConfig();
  let params = '';
  isRebuilding = true;

  // NOTE: This doesn't cause ThumbsUp to notice the picasa.ini file changes, so it doesn't work for now.
  if (incremental) {
    // Build the include arguments from the fileQueue
    const includeArgs = fileQueue.map((filename) => `--include ${filename}`).join(' ');
    params = ` ${includeArgs} --cleanup false --log trace`;
  }

  // Reset the fileQueue
  fileQueue = [];

  console.log(`Rebuilding website${params && ' with params' + params}`);

  exec(`${rebuildCmd} ${params}`, (err, stdout, stdErr) => {
    isRebuilding = false;

    if (err) {
      const errorCode = err.code;
      console.error(`Exit code ${errorCode}`);
      console.error(err);
    }

    if (stdErr) {
      console.error(stdErr);
    }

    if (stdout) {
      console.log(stdout);
    }

    // Recursive call
    if (fileQueue.length) {
      rebuildWebsite();
    }
  });
}

// Schedule a rebuild of the

module.exports = {
  rebuildWebsiteForFile,
};
