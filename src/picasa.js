/*
--------------------------------------------------------------------------------
Provides Picasa metadata based on <picasa.ini> files in the input folder.
It also caches the data locally
--------------------------------------------------------------------------------
*/
const ini = require('ini');
const fs = require('fs');
const path = require('path');

const PICASA_INI = 'picasa.ini'

class Picasa {
  constructor(dir) {
    this.dir = dir;
    this.data = loadPicasa(dir);
  }

  save() {
    // Normally sections that contain file names are encoded as [file\.ext]
    // This breaks ThumbsUp, so we need to replace all of the "\." with just "."
    fs.writeFileSync(path.join(this.dir, PICASA_INI), ini.encode(this.data).replace(/\\\./g, '.'));
  }

  updateFile(filename, configToMerge) {
    const existingConfig = this.getKeyConfig(filename) || {};
    this.setKeyConfig(filename, { ...existingConfig, ...configToMerge })
  }

  getKeyConfig(keyName) {
    const keyParts = keyName.split('.');
    return getIniValue(this.data, keyParts);
  }

  setKeyConfig(keyName, value) {
    const keyParts = keyName.split('.');
    let parentNode = this.data;

    // Build the correct key-structure from the keyName (if the structure does not exist), then set the key's value
    while (keyParts.length > 1) {
      const key = keyParts.shift()
      if (!parentNode[key]) {
        parentNode[key] = {}
      }
      parentNode = parentNode[key]
    }
    parentNode[keyParts[0]] = value;
  }
}

function loadPicasa(dirname) {
  const inipath = path.join(dirname, PICASA_INI);
  const content = loadIfExists(inipath);
  if (!content) {
    // return an empty hash, as if the picasa.ini file existed but was empty
    return {};
  } else {
    return ini.decode(content);
  }
}

function loadIfExists(filepath) {
  try {
    return fs.readFileSync(filepath, 'utf-8');
  } catch (ex) {
    return null;
  }
}

// The INI parser creates nested objects when the key contains a '.'
// this is a problem for sections like [IMG_0001.jpg]
// this might get fixed with https://github.com/npm/ini/issues/60
// but for now we have to recursively get the value
function getIniValue(iniObject, keyParts) {
  const current = iniObject[keyParts[0]];
  if (!current) {
    return null;
  } else if (keyParts.length === 1) {
    return current;
  } else {
    return getIniValue(current, keyParts.slice(1));
  }
}

module.exports = Picasa;
