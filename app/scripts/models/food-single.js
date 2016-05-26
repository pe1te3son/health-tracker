var app = app || {};

(function(){
  'use strict';

  app.FoodSingle = Backbone.Model.extend({
    defaults: {
      name: "",
      calories: 0
    }
  });

})();
