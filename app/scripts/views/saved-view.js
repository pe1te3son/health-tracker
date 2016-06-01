var app = app || {};

(function($){
  'use strict';

  app.SavedFoodView = Backbone.View.extend({
    el: '#saved-food-view',

    initialize: function(dateToday){
      this.colection = new app.FirebaseFoodCol();
      this.$list = $('#saved-food-list');
      this.$caloriesContainer = $('#all-calories');
      this.listenTo(this.colection, 'remove', this.render);
      this.listenTo(this.colection, 'add', this.render);
      this.date = dateToday;

    },

    render: function(){
      var self = this;
      self.$list.html('');
      self.colection.each(function(item){

        var foodview = new app.SavedSingleView({model: item});
        self.$list.append(foodview.render().el);

      }.bind(self));

      // Counts and updates calories each time data are upated and saves them
      this.displayCaloriesSum();
    },

    addOne: function(food){
      this.colection.create(food.model.toJSON());
      console.log(food.model.toJSON());
    },

    displayCaloriesSum: function(){
      var caloriesSum = this.colection.countAll();
      this.$caloriesContainer.html('');
      this.$caloriesContainer.html(caloriesSum);

      if(caloriesSum > 0){
        this.sendToGraph(caloriesSum);
      }

    },

    sendToGraph: function(caloriesToday){
      app.graphCol.create({id: 'caloriesToday', calories: caloriesToday});
    }

  });
})(jQuery);
