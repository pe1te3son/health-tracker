var app = app || {};

(function(){
  'use strict';

  app.Food = Backbone.Model.extend({
    defaults: {
      name: "",
      calories: "",
      onList: false
    }

  
  });

})();
