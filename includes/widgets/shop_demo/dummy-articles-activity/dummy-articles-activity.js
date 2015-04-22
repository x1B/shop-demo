/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 */
define( [
   'angular',
   './articles'
], function( ng, articles ) {
   'use strict';

   Controller.$inject = [ 'axContext' ];

   function Controller( context ) {
      context.eventBus.subscribe( 'beginLifecycleRequest', function() {
         context.eventBus.publish( 'didReplace.' + context.features.articles.resource, {
            resource: context.features.articles.resource,
            data: {
               entries: articles
            }
         } );
      } );
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return ng.module( 'dummyArticlesActivity', [] )
      .controller( 'DummyArticlesActivityController', Controller );

} );
