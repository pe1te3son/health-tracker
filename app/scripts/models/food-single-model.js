var app = app || {};

(function(){
  app.FoodSingle = Backbone.Model.extend({
    defaults: {
      brandName: "",
      name: "",
      calories: 0,
      saved: false
    }
  });
})();
