const { getConfig } = require('../config');
const fs = require('fs');
const Picasa = require('../picasa');
const { resolve, join } = require('path');

module.exports = {
  getFileList,
};

function getFileList(folderName, usePicasa = false) {
  const basePath = resolve(getConfig().inputDir, folderName);
  console.log('getFileList()', basePath, usePicasa);

  if (!usePicasa) {
    // Get the list of files from the current folder name, recursively
    return getAllMediaFilesFromFileSystem(basePath);
  }
  // console.log('getFileList()', getAllFilesFromPicasa(basePath));
  return getAllFilesFromPicasa(basePath);
}

function getAllMediaFilesFromFileSystem(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllMediaFilesFromFileSystem(dirPath + '/' + file, arrayOfFiles);
    } else if (!file.toLowerCase().endsWith('.ini')) {
      // We don't want Picasa.ini files
      arrayOfFiles.push(join(dirPath, '/', file));
    }
  });

  return arrayOfFiles;
}

function getAllFilesFromPicasa(dirPath, arrayOfFiles = []) {
  const picasa = new Picasa(dirPath);
  // Save the file names to the array
  arrayOfFiles = arrayOfFiles.concat(picasa.getStarFiles().map((p) => join(dirPath, '/', p)));

  // console.log('*', arrayOfFiles);

  const files = fs.readdirSync(dirPath);

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFilesFromPicasa(dirPath + '/' + file, arrayOfFiles);
    }
  });

  return arrayOfFiles;
}
