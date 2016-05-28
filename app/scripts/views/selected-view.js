var app = app || {};

(function($){
  'use strict'

  app.SelectedView = Backbone.View.extend({

    el: '#selected-food-cont',
    colection: app.selectedfoodCol,

    events: {
      'click #date-btn': 'retrieveData'
    },

    initialize: function(){
      this.$caloriesSum = $('#calories-sum');
      this.$selectedFood = $('#selected-food');
      this.listenTo(this.colection, 'add', this.addOne);
      this.listenTo(this.colection, 'remove', this.render);
      this.date = "2016-5-28";

    },

    render: function(){

      this.$selectedFood.html('');
      this.colection.each(this.addOne, this);

    },

    addOne: function(food){
      var foodView = new app.FoodSingleView({model: food});
      this.$selectedFood.append(foodView.render().el);
    },

    retrieveData: function(){

    }

  });


})(jQuery);
