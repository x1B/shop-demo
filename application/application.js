// See https://github.com/LaxarJS/laxar/blob/master/docs/manuals/configuration.md
window.laxar = ( function() {
   'use strict';

   var modeAttribute = 'data-ax-application-mode';
   var script = document.querySelector( 'script[' + modeAttribute + ']' );
   var isProduction = script.getAttribute( modeAttribute ) !== 'DEBUG';

   return withOverrides( {
      name: 'LaxarJS ShopDemo',
      description: 'A DemoApp to learn how LaxarJS works.',
      theme: 'cube',
      useMergedCss: isProduction,
      useEmbeddedFileListings: isProduction,
      fileListings: {
         'application': 'var/listing/application_resources.json',
         'bower_components': 'var/listing/bower_components_resources.json',
         'includes': 'var/listing/includes_resources.json'
      }
   } );

   ////////////////////////////////////////////////////////////////////////////

   function withOverrides( laxar ) {
      var overridesAttribute = 'data-ax-application-overrides';
      var overrides = JSON.parse( script.getAttribute( overridesAttribute ) || '{}' );
      Object.keys( overrides || {} ).forEach( function( key ) {
         laxar[ key ] = overrides[ key ];
      } );
      return laxar;
   }

} )();
