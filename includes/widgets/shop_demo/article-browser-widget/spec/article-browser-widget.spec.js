/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 * www.laxarjs.org
 */
define( [
   'json!../bower.json',
   '../article-browser-widget',
   'laxar/laxar_testing',
   'angular-mocks',
   'json!./spec_data.json'
], function( manifest, widgetModule, ax, ngMocks, resourceData ) {
   'use strict';

   describe( 'A ArticleBrowserWidget', function() {

      var anyFunction = jasmine.any( Function );
      var testBed;
      var configuration = {
         articles: {
            resource: 'articles'
         },
         selection: {
            resource: 'selectedArticle'
         }
      };

      function setup( features ) {
         testBed = ax.testing.portalMocksAngular.createControllerTestBed( manifest.name );
         testBed.featuresMock = features;
         testBed.setup();
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      afterEach( function() {
         testBed.tearDown();
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      describe( 'with feature articles and configured resource', function() {

         beforeEach( function() {
            setup( configuration );
            testBed.eventBusMock.publish( 'didReplace.articles', {
               resource: 'articles',
               data: resourceData
            } );
            jasmine.Clock.tick( 0 );
         } );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         it( 'acts as a slave of the resource and displays the list of articles', function() {
            expect( testBed.scope.eventBus.subscribe )
               .toHaveBeenCalledWith( 'didReplace.articles', anyFunction );
            expect( testBed.scope.resources.articles ).toEqual( resourceData );
         } );

      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      describe( 'with feature selection and user selects an article', function() {

         beforeEach( function() {
            setup( configuration );
            testBed.eventBusMock.publish( 'didReplace.articles', {
               resource: 'articles',
               data: resourceData
            } );
            jasmine.Clock.tick( 0 );

            testBed.scope.selectArticle( resourceData.entries[ 2 ] );
         } );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         it( 'publishes the resource with the selected article', function() {
            expect( testBed.scope.eventBus.publish )
               .toHaveBeenCalledWith( 'didReplace.selectedArticle', {
                  resource: 'selectedArticle',
                  data: resourceData.entries[ 2 ]
               } );
         } );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         var articles = {
            'null': null,
            'undefined': undefined,
            'empty list': { entries: [] },
            'list with other articles': { entries: resourceData.entries[ 1 ] }
         };

         ax.object.forEach( articles, function ( articlesData, description ) {

            describe( 'and a replace of the articles resource (' + description + ') without the selected article', function() {

               beforeEach( function() {
                  testBed.eventBusMock.publish( 'didReplace.articles', {
                     resource: 'articles',
                     data: articlesData
                  } );
                  jasmine.Clock.tick( 0 );
               } );

               ///////////////////////////////////////////////////////////////////////////////////////////////

               it( 'sets the selected article to null and publishes a didReplace event for it', function() {
                  expect( testBed.scope.selectedArticle ).toEqual( null );
                  expect( testBed.scope.eventBus.publish )
                     .toHaveBeenCalledWith( 'didReplace.selectedArticle', {
                        resource: 'selectedArticle',
                        data: null
                     } );
               } );

            } );

         } );

      } );

   } );

} );
