var app = app || {};

(function(){
  var SearchList = Backbone.Collection.extend({
    model: app.Food

  });

  app.searchList = new SearchList();
})();
