// See https://github.com/LaxarJS/laxar/blob/master/docs/manuals/configuration.md
window.laxarConfig = ( function() {
   'use strict';

   /* eslint-disable no-var,prefer-template */
   var modeAttribute = 'data-ax-application-mode';
   var mode = document.querySelector( 'script[' + modeAttribute + ']' ).getAttribute( modeAttribute );

   return {
      name: 'LaxarJS ShopDemo',
      description: 'A DemoApp to learn how LaxarJS works.',

      baseHref: window.location.pathname,
      flow: {
         name: 'main',
         router: {
            hashbang: true,
            dispatch: true
         }
      },
      logging: {
         threshold: 'TRACE'
      },
      paths: {
         defaultTheme: 'bower_components/laxar-uikit/dist/themes/default.theme'
      },
      theme: 'cube',
      tooling: {
         enabled: true
      },
      useMergedCss: mode === 'PRODUCTION'
   };

} )();
