var app = app || {};

(function(){
  'use strict';

  var SelectedFoodCol = Backbone.Firebase.Collection.extend({
    model: app.FoodSingle,

    url: 'https://health-tracker-janak.firebaseio.com/selectedfood/'

  });
  app.selectedfoodCol = new SelectedFoodCol();

})();
