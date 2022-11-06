// On ready, attach click handler to the #media element, and get our API endpoint
// which is a CSS custom property.
$(document).ready(function () {
  document.getElementById('media').addEventListener('click', toggleFavourite, { capture: true });
  // The custom CSS property includes string quotes (and whitespace), so we need to remove all that.
  window.API_ENDPOINT = getComputedStyle(document.documentElement)
    .getPropertyValue('--fav-api-endpoint')
    .replace(/["']*/g, '')
    .trim();

  // We also want to periodically poll the server to see what it is doing
  // Setup the server status component

  // Clicking the light offers the ability to restart the server
  $('#status-light').on('click', () => {
    const result = confirm('Restart server?');

    if (result) {
      const headers = { 'content-type': 'application/json' };
      fetch(window.API_ENDPOINT + '/kill', { method: 'GET', headers });
    }
  });

  setInterval(checkActivity, 2000);
  //checkActivity();
});


async function checkActivity() {
  const headers = { 'content-type': 'application/json' };
  const activities = await fetch(window.API_ENDPOINT + '/', { method: 'GET', headers })
    .then(r => r.json())
    .then(body => {
      return body.activities
    })
    .catch(err => {
      return {
        error: err
      }
    });

  const activityElem = $('#server-activity');
  const light = $('#status-light');

  if (activities.error) {
    activityElem.text(activities.error);
    light.text('😵')
    light.css('background', 'red');
  }
  else if (activities.rebuilding) {
    activityElem.text('Rebuilding');
    light.text('🚧')
    light.css('background', 'red');
  } else if (activities.rebuildPending) {
    activityElem.text('Pending rebuild');
    light.text('⏱')
    light.css('background', 'orange');
  }
  else {
    if (activityElem.text() !== 'Ready') {
      activityElem.text('Ready');
      light.text('✅')
      light.css('background', '#3f3');
    }
  }
}
