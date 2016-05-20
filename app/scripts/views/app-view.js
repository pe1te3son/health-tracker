var app = app || {};

(function($){
  'use strict';

  app.AppView = Backbone.View.extend({

    el: '#app',

    initialize: function(){

    },

    events: {
      "click .search-button": "searchQuery",
      "keypress #search-food": "searchQuery"
    },

    searchQuery: function(e){
      // Stops form from submiting
      e.preventDefault();
      app.searchList.reset();

      var $val = $('#search-food').val();
      var id = "9fbd69c5";
      var key = "4654813d6d125572f15f30d534dceb88";

      // Query string
      var ajaxUrl = 'https://api.nutritionix.com/v1_1/search/'+ $val +'?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2cnf_calories&appId=9fbd69c5&appKey=4654813d6d125572f15f30d534dceb88';

      // Request data
      $.ajax(ajaxUrl)
      .done(function(data){
        console.log(data);

        _.each(data.hits, function(item){
          app.searchList.add({name: item.fields.item_name, calories: item.fields.nf_calories});
        });
        
      })
      .fail(function(){
        console.log('fail');
      });

    }, //searchQuery ends

  }); // app ends

})(jQuery);
