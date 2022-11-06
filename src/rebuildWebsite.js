const { spawn } = require('child_process');
const { getConfig } = require('./config');
const debounce = require('debounce');
const { eventBus, EVENT } = require('./eventBus');

let fileQueue = [];
let isRebuilding = false;
let rebuildWebsite;

function rebuildWebsiteForFile(filename = '') {
  // First time initialisation for debounce
  if (!rebuildWebsite) {
    const rebuildDelayMillis = Number(getConfig().rebuildDelay || 3) * 1000;
    console.log('rebuildDelayMillis', rebuildDelayMillis);
    process.send('ready'); // For PM2: See https://pm2.keymetrics.io/docs/usage/signals-clean-restart/
    eventBus.emit(EVENT.REBUILD_PENDING_START);
    rebuildWebsite = debounce(doRebuild, rebuildDelayMillis, false);
  }

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
  eventBus.emit(EVENT.REBUILDING_START);
  eventBus.emit(EVENT.REBUILD_PENDING_END);

  // NOTE: This doesn't cause ThumbsUp to notice the picasa.ini file changes, so it doesn't work for now.
  if (incremental) {
    // Build the include-arguments from the fileQueue
    const includeArgs = fileQueue.map((filename) => `--include ${filename}`).join(' ');
    params = ` ${includeArgs} --cleanup false --log trace`;
  }

  // Reset the fileQueue
  fileQueue = [];

  console.log(` ----------------- Rebuilding website${params && ' with params' + params} -----------------`);

  // This is really dangerous to accept input and run it. But we need to support testing, and this is expedient.
  const [cmdName, ...cmdArgs] = rebuildCmd.replace(/["']/g, '').split(' ');
  console.log('Working dir', process.cwd(), cmdName, cmdArgs);
  const thumbsup = spawn(cmdName, cmdArgs);

  thumbsup.on('close', (code) => {
    console.log(` ----------------- Thumbsup exited with code ${code}  -----------------`);
    isRebuilding = false;
    eventBus.emit(EVENT.REBUILDING_END);

    if (fileQueue.length) {
      rebuildWebsite();
    }
  });

  thumbsup.on('error', (data) => {
    console.error(`${data}`.trimEnd());
  });

  thumbsup.stdout.on('data', (data) => {
    console.log(`${data}`.trimEnd());
  });

  thumbsup.stderr.on('data', (data) => {
    console.error(`${data}`.trimEnd());
  });
}

// Schedule a rebuild of the

module.exports = {
  rebuildWebsiteForFile,
};
