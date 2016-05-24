var app = app || {};

(function($){

  app.FoodView = Backbone.View.extend({
    tagName: 'li',
    foodTemplate: _.template($('#item-template').html()),

    events: {
      "click .add-btn": "addToFoodList"
    },

    render: function() {
      this.$el.html(this.foodTemplate(this.model.attributes));
      return this;
    },

    addToFoodList: function(){
      console.log(this);
      // use create to add to database
    }

  });

})(jQuery);
