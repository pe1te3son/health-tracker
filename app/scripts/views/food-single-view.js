var app = app || {};

(function(){
  app.FoodSingleView = Backbone.View.extend({
    tagName: 'tr',

    foodTemplate: _.template($('#food-single-template').html()),

    render: function() {
      //console.log(this);
      this.$el.html(this.foodTemplate(this.model.attributes));
      return this;
    }

  });

})();
