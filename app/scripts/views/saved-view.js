/**
  Saved items View

  Controls all food saved in database. Displays sum for everyday, adds and deletes
  each food item when clicked on.
*/


var app = app || {};

(function($){
  'use strict';

  app.SavedFoodView = Backbone.View.extend({
    el: '#saved-food-view',

    initialize: function(){
      this.$list = $('#saved-food-list');
      this.$caloriesContainer = $('#all-calories');
      this.$dateHolder = $('#date-today');
      this.listenTo(app.savedFoodCollection, 'add', this.addOne);

      // Counts and updates calories sum each time food is added or removed from colection
      this.displayCaloriesSum();

      // Updates selected date
      this.displayCurentDate();
    },

    render: function(){
      this.$list.html('');
      app.savedFoodCollection.each(this.addOne, this);

    },

    addOne: function(food){
      var foodview = new app.SavedSingleView({model: food});
      this.$list.prepend(foodview.render().el);
      this.displayCaloriesSum();
    },

    // Counts calories for each day
    displayCaloriesSum: function(){
      var caloriesSum = app.savedFoodCollection.countAll();
      var calFormated = parseFloat(caloriesSum).toFixed(1)
      this.$caloriesContainer.html('');
      this.$caloriesContainer.html(calFormated);

      if(caloriesSum > 0){
        this.saveDailyCalories(calFormated);
      }

    },

    // Saves sum in database
    saveDailyCalories: function(caloriesToday){
      this.calSumCol = new app.CalSumCol();
      this.calSumCol.create({id: 'caloriesToday', calories: caloriesToday, day: app.currentDate.day});

    },

    displayCurentDate: function(){
      // Appends current date
      this.$dateHolder.html('').append(
        '<span class="day-of-week">' +
        app.currentDate.dayOfWeek +
        '</span>' +
        '<span class="date">' +
        app.currentDate.month +
        ' ' +
        app.currentDate.day +
        ' ' +
        app.currentDate.year +
        '</span>'
      );
    }

  });
})(jQuery);
