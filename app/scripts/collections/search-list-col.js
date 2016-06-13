// Retrieves and Stores temporarily data from Nutritionix

var app = app || {};

(function(){
  'use strict';

  app.SearchListCol = Backbone.Collection.extend({
    model: app.FoodSingle,

    // Search string
    setInputVal: function(text) {
      this.inputVal = text;
    },

    // Nutritionix API data
    url: function() {
      var url = 'https://api.nutritionix.com/v1_1/search/',
          input = this.inputVal,
          results = '?results=0%3A11&cal_min=0&cal_max=50000',
          fields = '&fields=item_name%2Cbrand_name%2cnf_calories',
          id = '&appId=9fbd69c5',
          key = '&appKey=4654813d6d125572f15f30d534dceb88';

      return url + input + results + fields + id + key;
    },

    // Create an Array with Nutritionix response
    parse: function(response) {
      var searchArray = [];
      for (var i = 0; i < response.hits.length; i++) {
        var search = new app.FoodSingle({
          brandName: response.hits[i].fields.brand_name,
          name: response.hits[i].fields.item_name,
          calories: response.hits[i].fields.nf_calories
        });
        searchArray.push(search);
      }
      return searchArray;
    }

  });
})();
