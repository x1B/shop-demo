/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 */
define( [
   'require',
   'angular',
   './articles'
], function( require, ng, articles ) {
   'use strict';

   Controller.$inject = [ 'axContext', 'axEventBus' ];

   function Controller( context, eventBus ) {
      eventBus.subscribe( 'beginLifecycleRequest', function() {
         eventBus.publish( 'didReplace.' + context.features.articles.resource, {
            resource: context.features.articles.resource,
            data: {
               entries: articles.map( function( article ) {
                  var copy = ng.copy( article );
                  copy.pictureUrl = copy.picture ? require.toUrl( './images/' + copy.picture ) : null;
                  return copy;
               } )
            }
         } );
      } );
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return ng.module( 'dummyArticlesActivity', [] )
      .controller( 'DummyArticlesActivityController', Controller );

} );
