var app = app || {};

(function(){
  app.FoodSingleView = Backbone.View.extend({
    tagName: 'li',

    foodTemplate: _.template($('#food-single-template').html()),

    render: function() {
      //console.log(this);
      this.$el.html(this.foodTemplate(this.model.attributes));
      return this;
    }

  });

})();
