// Displays each food item returned from Nutritionix search query

var app = app || {};

(function($){
  'use strict';

  app.SearchSingleView = Backbone.View.extend({
    tagName: 'li',
    className: 'col-xs-12',

    singleFoodTemplate: _.template($('#search-single-template').html()),

    events: {
      'click': 'foodClicked'
    },

    render: function(){

      this.$el.html(this.singleFoodTemplate(this.model.attributes));
      return this;

    },
    foodClicked: function(){
      app.savedFoodView.addOne(this);
    }


  });
})(jQuery);
