var app = app || {};

(function(){
  'use strict';

  app.FirebaseFoodCol = Backbone.Firebase.Collection.extend({
    model: app.FoodSingle,
    url: function(){
      var url = 'https://health-tracker-janak.firebaseio.com/selectedfood/';
      var date = app.helpers.getDateStamp();
      return url + date;
    }

  });

})();
