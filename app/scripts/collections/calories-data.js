var app = app || {};

(function(){
  'use strict';

  var CaloriesData = Backbone.Firebase.Collection.extend({
    model: app.CaloriesToday,
    url: 'https://health-tracker-janak.firebaseio.com/calories-tracking'
  });
  app.caloriesData = new CaloriesData();
})();
