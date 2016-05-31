var app = app || {};

(function(){
  'use strict';

  app.DailyCalories = Backbone.Model.extend({
    defaults: {
      date: '',
      caloriesCurrentDay: 0
    }
  });
})();
