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
      this.listenTo(this.collection, 'add', this.addOne);
      //this.listenTo(this.collection, 'sync', this.render);

    },

    render: function(){
      this.$list.html('');

      this.collection.each(this.addOne, this);

      // Counts and updates calories sum each time food is added to colection
      this.displayCaloriesSum();

      // Updates selected date
      this.displayCurentDate();
    },

    addOne: function(food){
      var foodview = new app.SavedSingleView({model: food});
      this.$list.prepend(foodview.render().el);
      this.displayCaloriesSum();
    },

    createModel: function(food){
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
