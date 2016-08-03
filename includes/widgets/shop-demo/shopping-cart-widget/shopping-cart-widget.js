/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
import { assert } from 'laxar';

export const name = 'shopping-cart-widget';
export const injections = [ 'axEventBus', 'axId', 'axFeatures', 'axLog', 'axWithDom' ];
export function create( eventBus, id, features, log, withDom ) {

   const format = number => number.toLocaleString( window.navigator.language, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
   } );

   let article = null;
   let cart = [];

   eventBus.subscribe( `didReplace.${features.article.resource}`, ({ data }) => { article = data; } );

   features.article.onActions.forEach( action => {
      eventBus.subscribe( `takeActionRequest.${action}`, () => {
         eventBus.publish( `willTakeAction.${action}`, { action } );
         if( article ) {
            addArticleToCart( article );
         }
         eventBus.publish( `didTakeAction.${action}`, { action } );
      } );
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function addArticleToCart( newArticle ) {
      if( !cart.some( item => item.article.id === newArticle.id ) ) {
         cart = [ ...cart, { article: newArticle, quantity: 1 } ];
      }
      else {
         cart = cart.map( ( { article, quantity } ) => {
            return { article, quantity: article.id === newArticle.id ? quantity + 1 : quantity };
         } );
      }

      updateDom();
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function removeArticleFromCart( articleToRemove ) {
      cart = cart
         .map( ({ article, quantity }) => {
            return { article, quantity: article.id === articleToRemove.id ? quantity - 1 : quantity };
         } )
         .filter( ({ quantity }) => quantity > 0 );

      updateDom();
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function updateDom() {
      withDom( element => {
         const $ = selector => q( element, selector )[ 0 ];
         const cartEmpty = !cart.length;
         toggleClass( $( '.app-order-button-area' ), 'hidden', cartEmpty );
         toggleClass( $( '.app-articles-row' ), 'hidden', cartEmpty );
         toggleClass( $( '.app-no-articles-row' ), 'hidden', !cartEmpty );

         updateCartTable();
         updateSum();
      } );
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function updateCartTable() {
      withDom( element => {
         const container = q( element, '.app-articles-container' )[ 0 ];
         Array.from( container.childNodes ).forEach( node => {
            node.parentNode.removeChild( node );
         } );

         const cartRows = cart.length ? cart.reduce( ( html, item ) => {
            return html + rowTemplate( item );
         }, '' ) : '<tr><td colspan="5">&nbsp;</td></tr>';

         // fun stuff for IE 9 as it doesn't allow innerHTML on tbody elements for trs ...
         const tempDiv = document.createElement( 'div' );
         tempDiv.innerHTML = `<table><tbody>${cartRows}</tbody></table>`;
         q( tempDiv, 'tr' ).forEach( row => {
            row.parentNode.removeChild( row );
            container.appendChild( row );
         } );

         q( container, 'button' ).forEach( button => {
            const { action, articleId } = button.dataset || {
               action: button.getAttribute( 'data-action' ),
               articleId: button.getAttribute( 'data-article-id' )
            };
            const [ { article } ] = cart.filter( ({ article }) => article.id === articleId );
            button.addEventListener( 'click', () => {
               switch( action ) {
                  case 'increase':
                     addArticleToCart( article );
                     break;

                  case 'decrease':
                     removeArticleFromCart( article );
                     break;

                  default:
                     assert.codeIsUnreachable( `Unsupported action ${action}.`);
               }
            } );
         } );

      } );
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function updateSum() {
      withDom( element => {
         const sum = cart.reduce( ( sum, { article, quantity } ) => sum + ( quantity * article.price ), 0 );
         q( element, '.app-out-sum' )[ 0 ].innerHTML = `${format( sum )}€`;
      } );
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function initOrderButton() {
      withDom( element => {
         q( element, '.app-order-button-area > button' )[ 0 ].addEventListener( 'click', () => {
            const { target } = features.order;
            eventBus.publish( `navigateRequest.${target}`, { target } );
         } );
      } );
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function toggleClass( element, cssClass, set ) {
      // simply using element.classList.toggle doesn't work in ie ...
      const MATCHER = new RegExp( `\\b${cssClass}\\b` );
      if( !set ) {
         element.className = element.className.replace( MATCHER, ' ' ).trim();
         return;
      }

      if( !MATCHER.exec( element.className ) ) {
         element.className = `${element.className} ${cssClass}`.trim();
      }
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function q( element, selector ) {
      return Array.from( element.querySelectorAll( selector ) );
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function rowTemplate( { article, quantity } ) {
      return `
      <tr>
         <td class="app-col-1">${article.id}</td>
         <td>${article.name}</td>
         <td class="text-right">${format( article.price )}€</td>
         <td class="text-right app-increase-quantity">${quantity}</td>
         <td class="app-increase-buttons">
            <button class="btn btn-link" type="button" data-article-id="${article.id}" data-action="increase"
               ><i class="fa fa-plus-square"></i></button>
            <button class="btn btn-link" type="button" data-article-id="${article.id}" data-action="decrease"
               ><i class="fa fa-minus-square"></i></button>
         </td>
      </tr>`;
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return {
      onDomAvailable() {
         updateDom();
         initOrderButton();
      }
   };
}
