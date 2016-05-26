var app = app || {};

(function($){
  'use strict';

  app.AppView = Backbone.View.extend({
    el: '#app',

    events : {
      'click #search-btn': 'getData'
    },

    initialize: function(){
      this.$list = $('search-result-list');
      this.searchResultView = new app.SearchResultView();
    },

    getData: function(e){
      if(e.type === 'click' ){
        e.preventDefault();
        app.searchResultsCol.reset();

        var $val = $('#search-food').val();
        var id = "9fbd69c5";
        var key = "4654813d6d125572f15f30d534dceb88";

        // Query string
        var ajaxUrl = 'https://api.nutritionix.com/v1_1/search/'+ $val +'?results=0%3A10&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2cnf_calories&appId=9fbd69c5&appKey=4654813d6d125572f15f30d534dceb88';

        $.ajax(ajaxUrl)
        .done(function(data){

          _.each(data.hits, function(item){
            var name = item.fields.brand_name + ', ' + item.fields.item_name;
            var calories = item.fields.nf_calories;
            var food = new app.FoodSingle({ name: name, calories: calories });
            app.searchResultsCol.add(food);
          });

        })
        .fail(function(){
          console.log('failed to connect');
        });

      }
    }//getData ends

  });

})(jQuery);
