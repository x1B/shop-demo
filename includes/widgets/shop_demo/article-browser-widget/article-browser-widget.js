/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 * www.laxarjs.org
 */
define( [
   'angular'
], function( ng ) {
   'use strict';

   Controller.$inject = [ '$scope', 'axEventBus' ];

   function Controller( $scope, eventBus ) {

      $scope.resources = {};
      $scope.selectedArticle = null;

      eventBus.subscribe( 'didReplace.' + $scope.features.articles.resource, function( event ) {
         $scope.resources[ $scope.features.articles.resource ] = event.data;
         updateSelection();
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      $scope.selectArticle = function( article ) {
         $scope.selectedArticle = article;
         eventBus.publish( 'didReplace.' + $scope.features.selection.resource, {
            resource: $scope.features.selection.resource,
            data: article
         } ).then( function() {
            eventBus.publish( 'takeActionRequest.' + $scope.features.selection.action, {
               action: $scope.features.selection.action
            } );
         } );
      };

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function updateSelection() {
         var resources = $scope.resources;
         var selectedArticle = $scope.selectedArticle;
         if( selectedArticle === null ) {
            return;
         }

         var entries = resources.articles ? resources.articles.entries : [];
         if( !entries.length ) {
            $scope.selectArticle( null );
            return;
         }

         var selectedArticleExists = entries.some( function( article ) {
            return article.id === selectedArticle.id;
         } );

         if( !selectedArticleExists ) {
            $scope.selectArticle( null );
         }
      }

   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return ng.module( 'articleBrowserWidget', [] )
      .controller( 'ArticleBrowserWidgetController', Controller );

} );
