/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
/* global define */
define( [
   'angular'
], ng => {
   'use strict';

   window.angularFromWidget = ng;
   ng.knownRefs = ng.knownRefs || [];
   ng.knownRefs.push( 'widget' );
   console.log( 'angular from widget' );

   Controller.$inject = [ '$scope', 'axEventBus', '$httpBackend', '$http', '$timeout', 'axConfiguration' ];

   function Controller( $scope, eventBus, $httpBackend, $http, $timeout, conf ) {

      console.log( 'Controller test?', ng.test, $timeout, conf.HALLO );

      $scope.resources = {};
      $scope.selectedArticle = null;

      $http.get( '/test' );


      const articlesResource = $scope.features.articles.resource;
      eventBus.subscribe( `didReplace.${articlesResource}`, event => {
         $scope.resources.articles = event.data;
         $scope.selectArticle( null );
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      $scope.selectArticle = function( article ) {
         $scope.selectedArticle = article;

         const selectionResource = $scope.features.selection.resource;
         eventBus.publish( `didReplace.${selectionResource}`, {
            resource: selectionResource,
            data: article
         } );
      };

   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return ng.module( 'articleBrowserWidget', [] )
      .controller( 'ArticleBrowserWidgetController', Controller );

} );
