var app = app || {};

(function(){
  var SearchResultsCol = Backbone.Collection.extend({
    model: app.FoodSingle
  });

  app.searchResultsCol = new SearchResultsCol();
})();
