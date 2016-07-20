// See https://github.com/LaxarJS/laxar/blob/master/docs/manuals/configuration.md
window.laxarConfig = ( function() {
   'use strict';

   var modeAttribute = 'data-ax-application-mode';
   var mode = document.querySelector( 'script[' + modeAttribute + ']' ).getAttribute( modeAttribute );

   return {
      tooling: {
         enabled: true
      },
      logging: {
         threshold: 'TRACE'
      },
      name: 'LaxarJS ShopDemo',
      description: 'A DemoApp to learn how LaxarJS works.',
      theme: 'cube',
      useMergedCss: mode === 'PRODUCTION',
      useEmbeddedFileListings: mode === 'PRODUCTION',
      paths: {
         defaultTheme: 'bower_components/laxar-uikit/dist/themes/default.theme'
      }
   };

} )();
