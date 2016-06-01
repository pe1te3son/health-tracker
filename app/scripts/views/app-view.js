var app = app || {};

(function($){
  'use strict';

  app.AppView = Backbone.View.extend({

    el: '#app',

    initialize: function(){
      app.currentDay = moment().format('DD-MM-YYYY');
      app.searchView = new app.SearchView();
      app.graphCol = new app.GraphCol();
      app.picker = new Pikaday(
    {
        field: document.getElementById('datepicker-input'),
        firstDay: 1,
        minDate: new Date(2000, 0, 1),
        maxDate: new Date(moment().year(), moment().month(), moment().format('D')),
        yearRange: 5,
        bound: false,
        onSelect: function() {
          app.currentDay = this.getMoment().format('DD-MM-YYYY');
          app.savedFoodView.initialize(app.currentDay);
          app.savedFoodView.render();
        },
        container: document.getElementById('datepicker-container'),
    });
    app.savedFoodView = new app.SavedFoodView(app.currentDay);

    }

  });

})(jQuery);
