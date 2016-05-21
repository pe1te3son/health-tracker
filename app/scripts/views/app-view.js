var app = app || {};

(function($){
  'use strict';

  app.AppView = Backbone.View.extend({

    el: '#app',

    foodTemplate: _.template($('#item-template').html()),

    initialize: function(){
      this.$list = $('.search-result');

    },

    events: {
      "click .search-button": "searchQuery",
      "keypress #search-food": "searchQuery"
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
        var ajaxUrl = 'https://api.nutritionix.com/v1_1/search/'+ $val +'?results=0%3A10&cal_min=0&cal_max=50000&fields=item_name%2cnf_calories&appId=9fbd69c5&appKey=4654813d6d125572f15f30d534dceb88';

        // Request data
        $.ajax(ajaxUrl)
        .done(function(data){

          _.each(data.hits, function(item){
            // Create new food model
            var food = new app.Food({name: item.fields.item_name, calories: item.fields.nf_calories});
            // for(var i = 0; i < app.searchList.length + 1; i++){
            //   if(app.searchList.at(i).get('name') === food.toJSON().name){
            //     console.log('got it');
            //     break;
            //   }else{
            //
            //   }
            // }
            app.searchList.add(food);
          });

          self.render();
        })
        .fail(function(){
          console.log('fail');
        });
      }// if ends


    }, //searchQuery ends

    displayOne: function(food){
      this.$list.append(this.foodTemplate(food.toJSON()));
    },

    render: function(){
    this.$list.html('');
    app.searchList.each(this.displayOne, this);

    }

  }); // app ends

})(jQuery);
