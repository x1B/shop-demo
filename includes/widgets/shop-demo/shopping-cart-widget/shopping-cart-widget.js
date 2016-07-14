/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */

import * as ng from 'angular';

Controller.$inject = [ '$scope', 'axEventBus' ];

function Controller( $scope, eventBus ) {

   $scope.resources = {};
   $scope.cart = [];
   $scope.sum = 0;

   const articleResource = $scope.features.article.resource;
   eventBus.subscribe( `didReplace.${articleResource}`, event => {
      $scope.resources.article = event.data;
   } );

   $scope.features.article.onActions.forEach( action => {
      eventBus.subscribe( `takeActionRequest.${action}`, () => {
         eventBus.publish( `willTakeAction.${action}`, { action } );
         if( $scope.resources.article !== null ) {
            addArticleToCart( $scope.resources.article );
         }
         eventBus.publish( `didTakeAction.${action}`, { action } );
      } );
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   $scope.increaseQuantity = function( item ) {
      ++item.quantity;
      updateSum();
   };

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   $scope.decreaseQuantity = function( item ) {
      --item.quantity;
      if( item.quantity === 0 ) {
         $scope.cart.splice( $scope.cart.indexOf( item ), 1 );
      }
      updateSum();
   };

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   $scope.placeOrder = function() {
      const target = $scope.features.order.target;
      eventBus.publish( `navigateRequest.${target}`, { target } );
   };

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function addArticleToCart( article ) {
      let item = itemByArticle( article );
      if( !item ) {
         item = { article, quantity: 0 };
         $scope.cart.push( item );
      }
      $scope.increaseQuantity( item );
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function itemByArticle( article ) {
      return $scope.cart.filter( item => article.id === item.article.id )[ 0 ] || null;
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function updateSum() {
      $scope.sum = $scope.cart.reduce( ( acc, item ) => {
         return acc + ( item.quantity * item.article.price );
      }, 0 );
   }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const name = ng.module( 'shoppingCartWidget', [ 'ngSanitize' ] )
   .controller( 'ShoppingCartWidgetController', Controller )
   .name;
