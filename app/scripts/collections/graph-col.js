// Stores data for graph

var app = app || {};

(function(){
  'use strict';

  app.GraphCol = Backbone.Firebase.Collection.extend({
    url: function(){
      var url = app.firebaseUrl;
      var userId = app.userId;
      var year = app.currentDate.year;
      var month = app.currentDate.month;

      return url + userId + '/' + year + '/' + month;
    }

  });
})();
