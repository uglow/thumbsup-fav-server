const Picasa = require('./picasa');
const { resolve } = require('path');

/**
 * Updates/Creates the Picasa.ini file
 * @param params.isFav {boolean} Is the file a favourite-or-not
 * @param params.path {string} Path to media file (relative to the /input path)
 * @param params.file {string} Name of media file being changed
 *
 * @returns {boolean} success/failure
 */
function updatePicasa(params) {
  const { inputDir, isFav, path, file } = params;
  console.log('inputDir', inputDir, ', isFav', isFav, ', path', path, ', file', file);
  console.log(`Target Picasa.ini: ${resolve(inputDir, path)}`);

  try {
    const picasa = new Picasa(resolve(inputDir, path));
    picasa.updateFile(file, { star: isFav ? 'yes' : 'no' });
    picasa.save();
  } catch (err) {
    console.log(err);
    return false;
  }

  return true;
}

module.exports = updatePicasa;
