// Stores All calories for each day
// Creates custom link for every year month and day

var app = app || {};

(function(){
  'use strict';

  app.FirebaseFoodCol = Backbone.Firebase.Collection.extend({
    model: app.FoodSingle,
    url: function(){
      var url = app.firebaseUrl;
      var userId = app.userId;
      var year = app.currentDate.year;
      var month = app.currentDate.month;
      var day = app.currentDate.day;
      return url + userId + '/' + year + '/'+ month + '/'+ day + '/food';
    },

    // When called it returns sum of calories for current date
    countAll: function(){
      var allCalories = 0;

      this.forEach(function(item){
        allCalories += item.toJSON().calories;
      });

      return allCalories;
    }

  });

})();
