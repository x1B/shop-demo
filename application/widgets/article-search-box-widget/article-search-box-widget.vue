<template>
   <form role="form">
      <div class="form-group">
         <div class="input-group">
            <input class="form-control"
                   type="text"
                   placeholder="Search for articles"
                   @change="updateSearch()"
                   v-model="searchTerm">
         </div>
      </div>
   </form>
</template>


<script>
const searchFields = [ 'some', 'id', 'htmlDescription' ];

/**
 * Copyright 2017 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
export default {
   data: () => ({ searchTerm: '', articles: [], filteredArticles: [] }),
   created() {
      const articlesResource = this.features.articles.resource;

      this.eventBus.subscribe( `didReplace.${articlesResource}`, ({ data }) => {
         this.articles = data.entries || [];
         this.search();
      } );

      this.eventBus.subscribe( 'didNavigate', ({ data }) => {
         this.searchTerm = data[ this.features.navigation.parameterName ] || '';
         this.search();
      } );
   },
   computed: {
      isSelected() {
         return this.article.id !== null;
      }
   },
   methods: {
      updateSearch() {
         const target = '_self';
         const data = {
            [ this.features.navigation.parameterName ]: this.searchTerm || null
         };
         this.eventBus.publish( `navigateRequest.${target}`, { target, data } );
      },
      search() {
         const search = this.searchTerm.toLowerCase();
         const matches = subject => ( subject || '' ).toLowerCase().indexOf( search ) !== -1;
         const entries = search ?
            this.articles.filter( article => searchFields.some( field => matches( article[ field ] ) ) ) :
            this.articles;

         const hasChanged =
            this.filteredArticles.length !== entries.length ||
            this.filteredArticles.some( (article, i) => article.id !== entries[ i ].id );

         if( hasChanged ) {
            this.filteredArticles = entries;
            const { resource } = this.features.filteredArticles;
            this.eventBus.publish( `didReplace.${resource}`, {
               resource,
               data: { entries }
            } );
         }
      }
   }
};
</script>
