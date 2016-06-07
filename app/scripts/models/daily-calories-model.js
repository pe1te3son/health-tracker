// Model for daily calories sum
var app = app || {};

(function(){
  'use strict';

  app.DailyCalories = Backbone.Model.extend({
    defaults: {
      calories: 0,
      day: 0
    }
  });
})();
