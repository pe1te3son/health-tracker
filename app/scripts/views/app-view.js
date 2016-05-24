var app = app || {};

(function($){
  'use strict';

  app.AppView = Backbone.View.extend({

    el: '#app',

    foodTemplate: _.template($('#item-template').html()),

    initialize: function(){
      this.$list = $('.search-result');
      this.listenTo(app.searchList, 'add', this.addSearchItem);
      this.listenTo(app.searchList, 'reset', this.clearSearchResult);

    },

    events: {
      "click .search-button": "searchQuery",
      "keypress #search-food": "searchQuery",

    },

    searchQuery: function(e){
      var self = this;

      if(e.keyCode === 13 || e.type === "click"){
        // Stops form from submiting
        e.preventDefault();

        app.searchList.reset();
        var $val = $('#search-food').val();
        var id = "9fbd69c5";
        var key = "4654813d6d125572f15f30d534dceb88";

        // Query string
        var ajaxUrl = 'https://api.nutritionix.com/v1_1/search/'+ $val +'?results=0%3A10&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2cnf_calories&appId=9fbd69c5&appKey=4654813d6d125572f15f30d534dceb88';

        // Request data
        $.ajax(ajaxUrl)
        .done(function(data){

          _.each(data.hits, function(item){
            // Create new food model
            var name = item.fields.brand_name + ", " + item.fields.item_name;
            var calories = item.fields.nf_calories
            app.searchList.add(new app.Food({name: name, calories: calories}));

          });

        //  self.render();
        })
        .fail(function(){
          console.log('fail');
        });
      }// if ends


    }, //searchQuery ends

    addSearchItem: function(item){

      var foodview = new app.FoodView({ model: item });
      this.$list.append(foodview.render().el);

    },

    clearSearchResult: function(){
      this.$list.html('');
    }

    // displayOne: function(food){
    //   this.$list.append(this.foodTemplate(food.toJSON()));
    // },
    //
    // render: function(){
    //   this.$list.html('');
    //   app.searchList.each(this.displayOne, this);
    //
    // }

  }); // app ends

})(jQuery);
