/* Add favourite toggle button to the toolbar */
(function ($, window, document, undefined) {
  'use strict';

  const defaults = {};
  const ID = 'lg-qr-btn';

  const QRCodeButton = function (element) {
    // get lightGallery core plugin data
    this.core = $(element).data('lightGallery');

    this.$el = $(element);

    // extend module default settings with lightGallery core settings
    this.core.s = $.extend({}, defaults, this.core.s);

    this.init();

    return this;
  };

  QRCodeButton.prototype.init = function () {
    const qrButton = `<span id="${ID}" title="Download QR Code for this image/video" class="lg-icon qr-code-btn"><img width="24" height="24" src="public/lightgallery/img/qr.svg"></span>`;
    this.core.$outer.find('.lg-toolbar').append(qrButton);

    // On Click, show the QR Code for the current page
    $('#lg-qr-btn').on('click.lg', () => {
      // Use the filename from the span to generate the download file name
      downloadQRCode(location.href);
    });
  };

  QRCodeButton.prototype.destroy = function () {
    $(`#${ID}`).off('click.lg');
  };

  $.fn.lightGallery.modules.qrButton = QRCodeButton;
})(jQuery, window, document);
