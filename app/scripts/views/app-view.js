var app = app || {};

(function($){
  'use strict';

  app.AppView = Backbone.View.extend({

    el: '#app',

    initialize: function(){
      app.searchView = new app.SearchView();
      app.savedFoodView = new app.SavedFoodView();
      app.picker = new Pikaday(
    {
        field: document.getElementById('datepicker-input'),
        firstDay: 1,
        minDate: new Date(2000, 0, 1),
        maxDate: new Date(2020, 12, 31),
        yearRange: [2000, 2020],
        bound: false,
        container: document.getElementById('datepicker-container'),
    });
    }

  });

})(jQuery);
