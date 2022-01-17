let FAV_API_URL = "";

// On ready, attach click handler to the #media element, and get our API endpoint
// which is a CSS custom property.
$(document).ready(function () {
  document
    .getElementById("media")
    .addEventListener("click", toggleFavourite, { capture: true });
  // The custom CSS property includes string quotes (and whitespace), so we need to remove all that.
  FAV_API_URL = getComputedStyle(document.documentElement).getPropertyValue(
    "--fav-api-endpoint"
  ).replace(/["']*/g, '').trim();
});

const FAV_ATTR = "data-fav";
const PATH_ATTR = "data-path";

function toggleFavourite(event) {
  // If the event was from an element with the .star class, handle it
  if (event.target.className.indexOf("star") > -1) {
    const elem = event.target;
    event.stopImmediatePropagation();

    // Get the data params from the element
    const isFav = elem.getAttribute(FAV_ATTR) === "true";
    const path = elem.getAttribute(PATH_ATTR);
    const pathParts = path.split("/");
    const file = pathParts.pop();
    const folderName = pathParts.join("/");

    console.log(file);
    console.log(folderName);
    const newFavValue = !isFav;

    // Call the API to toggle the state
    const headers = { "content-type": "application/json" };
    const body = JSON.stringify({ isFav: newFavValue, path: folderName, file });
    fetch(FAV_API_URL, { method: "POST", headers, body });

    // Now toggle the state, and call the API
    elem.setAttribute(FAV_ATTR, String(newFavValue));
  }
}
