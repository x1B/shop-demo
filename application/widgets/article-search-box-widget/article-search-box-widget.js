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

   Controller.$inject = [ '$scope', 'axEventBus', 'axFeatures' ];

   function Controller( $scope, eventBus, features ) {

      $scope.model = { searchTerm: '' };
      $scope.updateSearch = updateSearch;

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      let unfilteredArticles = [];
      let filteredArticles = [];
      const articlesResource = features.articles.resource;
      const filterArticlesResource = features.filteredArticles.resource;

      eventBus.subscribe( `didReplace.${articlesResource}`, ({ data }) => {
         unfilteredArticles = data.entries || [];
         search();
      } );

      eventBus.subscribe( 'didNavigate', ({ data }) => {
         $scope.model.searchTerm = data[ features.navigation.parameterName ] || '';
         search();
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function updateSearch() {
         const search = $scope.model.searchTerm || null;
         const target = '_self';
         const data = {};
         data[ features.navigation.parameterName ] = search;
         eventBus.publish( `navigateRequest.${target}`, { target, data } );
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
