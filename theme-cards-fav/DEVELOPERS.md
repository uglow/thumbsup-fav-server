# Developers

## How to add a new button to the lightgallery

1. Have a look at `theme/public/lightgallery/js/lg-qrcode.js`. This is a fairly simple
   example. Copy it to a new file in the same folder (e.g. `lg-new.js`)
2. Edit the copied file, and change all of the button references to be specific to the new file.
   (e.g. rename `QRCodeButton` to `<something else>`).
3. Edit `theme/album.hbs` to include a `<script>` tag to load the new JS file.
4. Edit `theme/theme.less` to style the new button.
