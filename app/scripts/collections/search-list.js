var app = app || {};

(function(){
  'use strict';
  var SearchList = Backbone.Collection.extend({
    model: app.Food

  });

  app.searchList = new SearchList();
})();
