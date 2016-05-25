var app = app || {};

(function(){
  'use strict';

  app.CaloriesToday = Backbone.Model.extend({
    defaults : {
      date: "",
      calories: 0
    }
  });
})();
