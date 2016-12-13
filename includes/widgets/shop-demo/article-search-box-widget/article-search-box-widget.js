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

   Controller.$inject = [ '$scope', 'axEventBus' ];

   function Controller( $scope, eventBus ) {

      $scope.model = {
         searchTerm: ''
      };
      $scope.updateSearch = updateSearch;

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      let unfilteredArticles = [];
      let filteredArticles = [];
      const articlesResource = $scope.features.articles.resource;
      const filterArticlesResource = $scope.features.filteredArticles.resource;

      eventBus.subscribe( `didReplace.${articlesResource}`, ({ data }) => {
         unfilteredArticles = data.entries || [];
         search();
      } );

      eventBus.subscribe( 'didNavigate', ({ data }) => {
         $scope.model.searchTerm = data.search || '';
         search();
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function updateSearch() {
         const search = $scope.model.searchTerm || null;
         const target = '_self';
         eventBus.publish( `navigateRequest.${target}`, { target, data: { search } } );
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function search() {
         let newFilteredArticles = unfilteredArticles;
         const searchTerm = $scope.model.searchTerm;
         if( searchTerm ) {
            newFilteredArticles = unfilteredArticles.filter( article => {
               return infixMatch( article.name, searchTerm ) ||
                  infixMatch( article.id, searchTerm ) ||
                  infixMatch( article.htmlDescription, searchTerm );
            } );
         }

         if( !ng.equals( newFilteredArticles, filteredArticles ) ) {
            filteredArticles = newFilteredArticles;
            eventBus.publish( `didReplace.${filterArticlesResource}`, {
               resource: filterArticlesResource,
               data: {
                  entries: filteredArticles
               }
            } );
         }
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function infixMatch( subject, query ) {
         return ( subject || '' ).toLowerCase().indexOf( query.toLowerCase() ) !== -1;
      }

   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return ng.module( 'articleSearchBoxWidget', [] )
      .controller( 'ArticleSearchBoxWidgetController', Controller );

} );
