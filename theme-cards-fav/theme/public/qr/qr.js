// https://www.npmjs.com/package/qrious
function downloadQRCode(url) {
  const element = document.getElementById('qrCanvas');
  const qr = new QRious({
    element,
    value: url,
    level: 'M', // Error correction level
    size: 400,
  });

  // Trigger the download automatically
  qrDownload(getFilenameForDownload(url))
}

function qrDownload(filename = 'download.png') {
  const element = document.getElementById('qrCanvas')
  const link = document.createElement('a');
  link.download = filename;
  link.href = element.toDataURL();
  link.click();
  link.delete;
}

const pathRE = /(?<name>[^/]+)\.(?<ext>.+)$/

function getFilenameForDownload(url) {
  let {name, ext} = url.match(pathRE).groups;
  const indexOfSlide = ext.indexOf('slide='); // try to use the slide num in the file name

  if (indexOfSlide > -1) {
    name += '_slide_' + ext.slice(indexOfSlide + 6)
  }
  return name + '.png'
}
