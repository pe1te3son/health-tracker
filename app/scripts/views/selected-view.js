var app = app || {};

(function($){
  'use strict'

  app.SelectedView = Backbone.View.extend({

    el: '#selected-food-cont',

    initialize: function(){
      this.$caloriesSum = $('#calories-sum');
      this.$selectedFood = $('#selected-food');
      this.listenTo(app.selectedfoodCol, 'update', this.render)
    },

    render: function(){
      console.log('i ran');
        this.$selectedFood.html('');
        app.selectedfoodCol.each(function(model){

          var foodView = new app.FoodSingleView({model: model});
          this.$selectedFood.append(foodView.render().el);
          
        }.bind(this));

    }

  });


})(jQuery);
