var app = app || {};

(function(){
  'use strict';

  var FoodList = Backbone.Firebase.Collection.extend({
    model: app.Food,
    url: 'https://health-tracker-janak.firebaseio.com/'
  });

  app.foodList = new FoodList();

})();
