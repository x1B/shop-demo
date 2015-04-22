/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 * laxarjs.org
 */
define( [
   'angular'
], function( ng ) {
   'use strict';

   Controller.$inject = [ '$scope', 'axEventBus' ];

   function Controller( $scope, eventBus ) {

      $scope.resources = { };
      $scope.model = {
         cartItems: [],
         sum: 0
      };

      eventBus.subscribe( 'didReplace.' + $scope.features.article.resource, function( event ) {
         $scope.resources.article = event.data;
      } );

      $scope.features.article.onActions.forEach( function( action ) {
         eventBus.subscribe( 'takeActionRequest.' + action, function() {
            eventBus.publish( 'willTakeAction.' + action, { action: action } );
            if( $scope.resources.article !== null ) {
               addArticleToCart( $scope.resources.article );
            }
            eventBus.publish( 'didTakeAction.' + action, { action: action } );
         } );
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      $scope.increaseQuantity = function( index ) {
         ++$scope.model.cartItems[ index ].quantity;
         updateSum();
      };

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      $scope.decreaseQuantity = function( index ) {
         if( $scope.model.cartItems[ index ].quantity === 1 ) {
            $scope.model.cartItems.splice( index, 1 );
         }
         else {
            --$scope.model.cartItems[ index ].quantity;
         }
         updateSum();
      };

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function addArticleToCart( article ) {
         var index = indexOfArticle( article );
         if( index === -1 ) {
            $scope.model.cartItems.push( {
               article: article,
               quantity: 1
            } );
            updateSum();
         }
         else {
            $scope.increaseQuantity( index );
         }
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function indexOfArticle( article ) {
         return $scope.model.cartItems
            .map( function( item ) { return item.article.id; } )
            .indexOf( article.id );
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function updateSum() {
         $scope.model.sum = $scope.model.cartItems.reduce( function( acc, item ) {
            return acc + item.quantity * ( item.article.price * 100 );
         }, 0 ) / 100;
      }

   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return ng.module( 'shoppingCartWidget', [ 'ngSanitize' ] )
      .controller( 'ShoppingCartWidgetController', Controller );

} );
