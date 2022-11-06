const FAV_ATTR = 'data-fav';
const PATH_ATTR = 'data-path';

function toggleFavourite(event) {
  // If the event was from an element with the .star class, handle it
  if (event.target.className.indexOf('star') > -1) {
    const elem = event.target;
    event.stopImmediatePropagation();

    // Get the data params from the element
    const isFav = elem.getAttribute(FAV_ATTR) === 'true';
    const path = elem.getAttribute(PATH_ATTR);
    const pathParts = path.split('/');
    const file = pathParts.pop();
    const folderName = pathParts.join('/');

    console.log(file);
    console.log(folderName);
    const newFavValue = !isFav;

    // Call the API to toggle the state
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify({ isFav: newFavValue, path: folderName, file });
    fetch(window.API_ENDPOINT + '/fav', { method: 'POST', headers, body });

    // Now toggle the state, and call the API
    elem.setAttribute(FAV_ATTR, String(newFavValue));
  }
}
