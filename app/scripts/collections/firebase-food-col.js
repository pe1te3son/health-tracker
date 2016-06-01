var app = app || {};

(function(){
  'use strict';

  app.FirebaseFoodCol = Backbone.Firebase.Collection.extend({
    model: app.FoodSingle,
    url: function(){
      var url = 'https://health-tracker-janak.firebaseio.com/';
      var year = app.currentDate.year;
      var month = app.currentDate.month;
      var day = app.currentDate.day;
      return url + '/ '+ year + '/ '+ month + '/ '+ day + '/food';
    },

    countAll: function(){
      var allCalories = 0;

      // Counts calories saved in this collection
      this.forEach(function(item){
        allCalories += item.toJSON().calories;
      });

      return allCalories;
    }

  });

})();
