// This is a function that can be used with the "albums-from" parameter.
// It creates an album containing all the favourites (in a single page),
// and album that preserves the folder structure of the favourites.

const path = require('path'); // The %path variable doesn't work (in contradiction to the docs), so we just use the same technique that %path maps to.

function favouriteAlbum(file) {
  return (file.meta.favourite === true) ? ['All Favourites', `Favourites by Folder/${path.dirname(file.path)}`] : []
}

module.exports = favouriteAlbum;
