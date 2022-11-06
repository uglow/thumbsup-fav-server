// https://www.npmjs.com/package/qrious
async function downloadFilelist(url) {
  // eslint-disable-next-line node/no-unsupported-features/node-builtins
  const urlObject = new URL(url);

  // Call the API and wait for the response
  const headers = { 'content-type': 'application/json' };

  const { paths } = await fetch(`${window.API_ENDPOINT}/manifest?path=${urlObject.pathname}`, { method: 'GET', headers }).then(res => res.json());

  createTextFileLink(paths.join('\n'));
}


function createTextFileLink(text, filename = 'manifest.txt') {
  const fileBlob = new Blob([text], {type: "application/octet-binary"});

  const link = document.createElement('a');
  link.download = filename;
  link.href = URL.createObjectURL(fileBlob);
  link.click();
  link.delete;
}
