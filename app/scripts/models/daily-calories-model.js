var app = app || {};

(function(){
  'use strict';

  app.DailyCalories = Backbone.Model.extend({
    defaults: {
      calories: 0
    }
  });
})();
