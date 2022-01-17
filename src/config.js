const path = require('path');
const fs = require('fs');

const config = {};

/**
 * Validates and sets the config
 * @param newConfig.inputDir {string}   Path to where the media files live (must be write-able)
 * @param newConfig.rebuildCmd {string} Command to rebuild the website
 * @param newConfig.incremental {string} Whether the build is incremental.
 */
function setConfig(newConfig) {
  const { inputDir, rebuildCmd, incremental = 'false' } = newConfig;

  config.inputDir = path.resolve(process.cwd(), inputDir);
  console.log('inputDir', config.inputDir);

  if (!fs.existsSync(config.inputDir)) {
    throw new Error(`inputDir path "${config.inputDir}"  does not exist`);
  }

  config.rebuildCmd = rebuildCmd;
  console.log('rebuildCmd', config.rebuildCmd);

  config.incremental = incremental === 'true';
  console.log('incremental', config.incremental);
}

function getConfig() {
  return config;
}

module.exports = {
  setConfig,
  getConfig,
};
