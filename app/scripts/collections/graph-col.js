var app = app || {};

(function(){
  'use strict';

  app.GraphCol = Backbone.Firebase.Collection.extend({
    model: app.DailyCalories,
    url: function(){
      var url = 'https://health-tracker-janak.firebaseio.com/calorieseachday/';
      return url;
    }
  });
})();
