var app = app || {};

(function(){
  'use strict';

  app.CalSumCol = Backbone.Firebase.Collection.extend({
    model: app.DailyCalories,
    url: function(){
      var url = 'https://health-tracker-janak.firebaseio.com/';
      var year = app.currentDate.year;
      var month = app.currentDate.month;
      var day = app.currentDate.day;
      return url + year + '/'+ month + '/' + day;
    }
  });
})();
