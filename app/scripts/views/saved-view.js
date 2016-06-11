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
      this.collection = new app.FirebaseFoodCol();
      this.$list = $('#saved-food-list');
      this.$caloriesContainer = $('#all-calories');
      this.$dateHolder = $('#date-today');
      this.listenTo(this.collection, 'remove', this.render);
      this.listenTo(this.collection, 'add', this.render);
      this.render();
    },

    render: function(){
      this.$list.html('');
      this.collection.each(function(item){

        var foodview = new app.SavedSingleView({model: item});
        this.$list.append(foodview.render().el);

      }.bind(this));

      // Counts and updates calories each time data are upated and saves them
      this.displayCaloriesSum();
      // Updates selected date
      this.displayCurentDate();
    },

    addOne: function(food){
      this.collection.create(food.model.toJSON());
    },

    // Counts calories for each day
    displayCaloriesSum: function(){
      var caloriesSum = this.collection.countAll();
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
