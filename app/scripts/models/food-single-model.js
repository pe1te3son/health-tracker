var app = app || {};

(function(){
  'use strict';
  
  app.FoodSingle = Backbone.Model.extend({
    defaults: {
      brandName: '',
      name: '',
      calories: 0,
      saved: false
    }
  });
})();
