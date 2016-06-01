var app = app || {};

(function($){
  'use strict';

  app.AppView = Backbone.View.extend({

    el: '#app',

    initialize: function(){
      app.currentDate = {
        year: moment().format('YYYY'),
        month: moment().format('MMMM'),
        day: moment().format('DD')
      };

      console.log(app.currentDate);

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
      app.savedFoodView = new app.SavedFoodView();

      $.jqplot('chartdiv',  [[[1, 2],[3,5.12],[5,13.1],[7,20],[9,85.9],[11,219.9]]],
        { title:'Calories this month',
          seriesDefaults: {
            rendererOptions: {
                smooth: true
            }
          },
          series:[{color:'#5FAB78'}],
          axes: {
              xaxis: {
                  min: 0,
                  label: 'Days'

              },
              yaxis: {
                  min: 0,
                  label: 'Calories',
                  labelRenderer: $.jqplot.CanvasAxisLabelRenderer
              }
          },
        });

    }

  });

})(jQuery);
