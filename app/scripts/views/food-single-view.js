var app = app || {};

(function($){
  app.FoodSingleView = Backbone.View.extend({
    tagName: 'li',

    singleFoodTemplate: _.template($('#food-single-template').html()),

    events: {
      'click': 'foodClicked'
    },

    render: function(){

      this.$el.html(this.singleFoodTemplate(this.model.attributes));
      return this;

    },

    foodClicked: function(){
      //this.parent.foodClicked(this.model);
      console.log(this.parent);
    }

  });
})(jQuery);
