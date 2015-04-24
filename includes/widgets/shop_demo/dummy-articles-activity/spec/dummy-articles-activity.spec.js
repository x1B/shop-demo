/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 */
define( [
   'json!../bower.json',
   '../dummy-articles-activity',
   'laxar/laxar_testing',
   '../articles'
], function( manifest, widgetModule, ax, articles ) {
   'use strict';

   describe( 'A DummyArticlesActivity', function() {

      var testBed_;

      beforeEach( function setup() {
         testBed_ = ax.testing.portalMocksAngular
            .createControllerTestBed( manifest.name );
         testBed_.featuresMock = {
            articles: {
               resource: 'articles'
            }
         };

         testBed_.setup();
      } );

      /////////////////////////////////////////////////////////////////////////

      afterEach( function() {
         testBed_.tearDown();
      } );

      /////////////////////////////////////////////////////////////////////////

      describe( 'on beginLifecycleRequest', function() {

         beforeEach( function() {
            testBed_.eventBusMock.publish( 'beginLifecycleRequest' );
            jasmine.Clock.tick( 0 );
         } );

         //////////////////////////////////////////////////////////////////////

         it( 'publishes some dummy articles', function() {
            expect( testBed_.scope.eventBus.publish )
               .toHaveBeenCalledWith( 'didReplace.articles', {
                  resource: 'articles',
                  data: {
                     entries: articles.map( function( article ) {
                        article.pictureUrl = article.picture ?
                           jasmine.any( String ) : null;
                        return article;
                     } )
                  }
               } );
         } );

      } );

   } );
} );
