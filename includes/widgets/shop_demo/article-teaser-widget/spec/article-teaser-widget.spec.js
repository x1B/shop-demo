/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 * www.laxarjs.org
 */
define( [
   'json!../bower.json',
   '../article-teaser-widget',
   'laxar/laxar_testing',
   'angular-mocks',
   'jquery',
   'json!./spec_data.json',
   'text!../default.theme/article-teaser-widget.html'
], function( manifest, widgetModule, ax, ngMocks, $, data, widgetMarkup  ) {
   'use strict';

   describe( 'A ArticleTeaserWidget', function() {

      var anyFunction = jasmine.any( Function );
      var testBed;
      var configuration = {
         article: {
            resource: 'article'
         },
         confirmation: {
            action: 'addArticle'
         }
      };

      /////////////////////////////////////////////////////////////////////////

      function setup( features ) {
         testBed = ax.testing.portalMocksAngular
            .createControllerTestBed( manifest.name );
         testBed.featuresMock = features;
         testBed.setup();

         ngMocks.inject( function( $compile ) {
            $( '#container' ).remove();
            var $widget = $( '<div id="container"></div>' )
               .html( widgetMarkup );
            $compile( $widget )( testBed.scope );
            $widget.appendTo( 'body' );
         } );
      }

      /////////////////////////////////////////////////////////////////////////

      afterEach( function() {
         testBed.tearDown();
      } );

      /////////////////////////////////////////////////////////////////////////

      describe( 'with feature display and configured resource', function() {

         beforeEach( function() {
            setup( configuration );
            testBed.eventBusMock.publish( 'didReplace.article', {
               resource: 'article',
               data: data
            } );
            jasmine.Clock.tick( 0 );
         } );

         //////////////////////////////////////////////////////////////////////

         it( 'subscribes to and displays the details.', function() {
            expect( testBed.scope.eventBus.subscribe )
               .toHaveBeenCalledWith( 'didReplace.article', anyFunction );
            expect( testBed.scope.resources.article ).toEqual( data );
         } );

      } );

      /////////////////////////////////////////////////////////////////////////

      describe( 'with feature confirmation, on user confirmation', function() {

         beforeEach( function() {
            setup( configuration );
            testBed.eventBusMock.publish( 'didReplace.article', {
               resource: 'article',
               data: data
            } );
            jasmine.Clock.tick( 0 );
            $( 'button' ).trigger( 'click' );
         } );

         //////////////////////////////////////////////////////////////////////

         it( 'triggers the configured action', function() {
            expect( testBed.scope.eventBus.publish )
               .toHaveBeenCalledWith( 'takeActionRequest.addArticle', {
                  action: 'addArticle'
               }
            );
         } );

      } );

   } );

} );
