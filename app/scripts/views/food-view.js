var app = app || {}

(function(){

  app.FoodView = Backbone.View.extend({
    
    foodTemplate: _.template($('#item-template').html()),

  });

})();
