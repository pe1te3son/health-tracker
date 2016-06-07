// Stores data for graph 

var app = app || {};

(function(){
  'use strict';

  app.GraphCol = Backbone.Firebase.Collection.extend({
    url: function(){
      var url = 'https://health-tracker-janak.firebaseio.com/';
      var year = app.currentDate.year;
      var month = app.currentDate.month;

      return url + year + '/' + month;
    }

  });
})();
