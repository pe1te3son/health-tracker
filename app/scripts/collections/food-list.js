var app = app || {};


(function(){
  'use strict';
  var FoodList = Backbone.Collection.extend({
    model: app.Food,

  });

  app.todos = new FoodList();
})();
