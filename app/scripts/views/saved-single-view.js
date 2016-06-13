// Displays each food item saved in database
var app = app || {};

(function($){
  'use strict';

  app.SavedSingleView = Backbone.View.extend({
    tagName: 'li',
    className: 'col-xs-12',

    singleFoodTemplate: _.template($('#saved-single-template').html()),

    events: {
      'click': 'foodClicked'
    },

    initialize: function(){
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function(){
      this.$el.html(this.singleFoodTemplate(this.model.attributes));
      return this;

    },

    foodClicked: function(){
      this.model.destroy();
      app.savedFoodView.displayCaloriesSum();
    },


  });
})(jQuery);
