<template>
<div>
   <h3 class="ax-function-point"
      :class="{ 'app-articles': resources.articles.entries.length }">
      <i class='fa fa-gift'></i> Articles
   </h3>
   <table class="table table-hover table-striped"
      :class="{ 'app-articles': resources.articles.entries.length }">
      <colgroup>
         <col class="app-col-1">
         <col class="app-col-2">
         <col class="app-col-3">
      </colgroup>
      <thead>
         <tr data-ng-if="!resources.articles.entries.length">
            <th class="app-no-articles" colspan="3">No articles</th>
         </tr>
         <tr data-ng-if="resources.articles.entries.length">
            <th>Art. ID</th>
            <th>Article</th>
            <th class="price">Price</th>
         </tr>
      </thead>
      <tbody>
         <tr class="selectable"
            v-for="article in resources.articles.entries"
            v-class="{ selected: article.id === selectedArticle.id }"
            @click="selectArticle( article )">
            <td class="app-col-1">{{ article.id }}</td>
            <td>{{ article.name }}</td>
            <td class="price">{{ article.price }}</td>
         </tr>
         <tr class="app-no-articles"
             data-ng-if="!resources.articles.entries.length">
            <td colspan="5">&nbsp;</td>
         </tr>
      </tbody>
   </table>
</div>
</template>

<script>
export default {
   data: () => ({
      resources: {
         articles: {
            entries: []
         }
      }
   }),
   created() {
      const { axEventBus } = this.$injections;
      this.interval = setInterval(() => {
         this.counter++;
      }, 1000);
   },
   destroyed() {
      clearInterval(this.interval);
   }
}
</script>
