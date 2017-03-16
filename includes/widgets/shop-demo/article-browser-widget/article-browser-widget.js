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

   Controller.$inject = [ '$scope', 'axEventBus', '$httpBackend', '$http' ];

   function Controller( $scope, eventBus, $httpBackend, $http ) {

      $scope.resources = {};
      $scope.selectedArticle = null;

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
