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

      eventBus.subscribe( 'didReplace.' + $scope.features.article.resource, function( event ) {
         $scope.resources.article = event.data;
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      $scope.addToCart = function() {
         var actionName = $scope.features.confirmation.action;
         eventBus.publish( 'takeActionRequest.' + actionName, {
            action: actionName
         } );
      };

   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return ng.module( 'articleTeaserWidget', [] )
      .controller( 'ArticleTeaserWidgetController', Controller );

} );
