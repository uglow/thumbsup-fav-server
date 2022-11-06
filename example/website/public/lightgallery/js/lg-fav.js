/* Add favourite toggle button to the toolbar */
(function ($, window, document, undefined) {
  const defaults = {};
  const FAV_ATTR = 'data-fav';
  const PATH_ATTR = 'data-path';

  const FavButton = function (element) {
    // get lightGallery core plugin data
    this.core = $(element).data('lightGallery');

    this.$el = $(element);

    // extend module default settings with lightGallery core settings
    this.core.s = $.extend({}, defaults, this.core.s);

    this.init();

    return this;
  };

  FavButton.prototype.init = function () {
    // Get a reference to the original thumbnail item that this lightgallery is being shown for.
    const initialGalleryItem = this.core.$items.eq(this.core.index).find('.star');
    // Get the original thumbnail's data-props, and copy them onto this button
    const path = initialGalleryItem.attr(PATH_ATTR);
    const favButton = `<span id="lg-fav-btn" class="lg-icon star" data-path="${path}'">⭐️</span>`;
    this.core.$outer.find('.lg-toolbar').append(favButton);
    cloneElemState($('#lg-fav-btn'), initialGalleryItem);

    // Hook this button up to the fav-button handler
    $('#lg-fav-btn').on('click.lg', (evt) => {
      toggleFavourite(evt); // defined in /public/favourite/favourite.js
      cloneElemState(initialGalleryItem, evt.target); // We want to keep the gallery item's state in-sync with the lightgallery button
    });

    // On each slide event, update the fav-button's attributes to match the galleryItem
    this.core.$el.on('onBeforeSlide.lg.tm', (evt, prevIndex, curIndex) => {
      const galleryItem = this.core.$items.eq(curIndex).find('.star');
      cloneElemState($('#lg-fav-btn'), galleryItem);
    });
  };

  FavButton.prototype.destroy = function () {
    $('#lg-fav-btn').off('click.lg');
    this.core.$el.off('onBeforeSlide.lg.tm');
  };

  function cloneElemState(targetElem, srcElem) {
    $(targetElem).attr(FAV_ATTR, $(srcElem).attr(FAV_ATTR));
    $(targetElem).attr(PATH_ATTR, $(srcElem).attr(PATH_ATTR));
  }

  $.fn.lightGallery.modules.favButton = FavButton;
})(jQuery, window, document);
