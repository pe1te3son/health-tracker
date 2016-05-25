var app = app || {};

(function($){
  'use strict';

  app.FoodView = Backbone.View.extend({
    tagName: 'li',
    foodTemplate: _.template($('#item-template').html()),

    events: {
      "click .add-btn": "addToFoodList",
      "click .remove-btn": "removeFromFoodList"
    },

    render: function() {
      this.$el.html(this.foodTemplate(this.model.attributes));
      return this;
    },

    addToFoodList: function(){

        var name = this.model.attributes.name;
        var calories =  this.model.attributes.calories;

        if(typeof app.foodList.findWhere({name: name, calories: calories}) === 'undefined' ){
          app.foodList.create({
            name: name,
            calories: calories,
            onList: true
          });
        }

    },

    removeFromFoodList: function(){
      var self = this.model;
      self.destroy({
        wait: true,
        success: function(model, response) {
          console.log(' deleted');
        },

        error: function(model, response){
          console.log('failed to remove');
        }
      });
    }

  });

})(jQuery);
