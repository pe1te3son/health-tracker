var app = app || {};

(function($){
  'use strict';

  app.SavedFoodView = Backbone.View.extend({
    el: '#saved-food-view',

    initialize: function(){
      this.collection = new app.FirebaseFoodCol();
      this.$list = $('#saved-food-list');
      this.$caloriesContainer = $('#all-calories');
      this.listenTo(this.collection, 'remove', this.render);
      this.listenTo(this.collection, 'add', this.render);

    },

    render: function(){
      var self = this;
      self.$list.html('');
      self.collection.each(function(item){

        var foodview = new app.SavedSingleView({model: item});
        self.$list.append(foodview.render().el);

      }.bind(self));

      // Counts and updates calories each time data are upated and saves them
      this.displayCaloriesSum();
    },

    addOne: function(food){
      this.collection.create(food.model.toJSON());
    },

    displayCaloriesSum: function(){
      var caloriesSum = this.collection.countAll();
      this.$caloriesContainer.html('');
      this.$caloriesContainer.html(caloriesSum);

      if(caloriesSum > 0){
        this.saveDailyCalories(caloriesSum);
      }

    },

    saveDailyCalories: function(caloriesToday){
      this.calSumCol = new app.CalSumCol();
      this.calSumCol.create({id: 'caloriesToday', calories: caloriesToday});
    }

  });
})(jQuery);
