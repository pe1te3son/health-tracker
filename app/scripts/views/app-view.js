var app = app || {};

(function($){
  'use strict';

  app.AppView = Backbone.View.extend({

    el: '#app',

    events: {
      'click .pika-day': 'render'
    },

    initialize: function(){

      app.currentDate = {
        year: moment().format('YYYY'),
        month: moment().format('MMMM'),
        day: moment().format('DD')
      };
      // Initializes the View to display search results
      app.searchView = new app.SearchView();

      // Datepicker
      // Each time date is selected, it renders the View for approprieate day
      app.picker = new Pikaday(
        {
            field: document.getElementById('datepicker-input'),
            firstDay: 1,
            minDate: new Date(2000, 0, 1),
            maxDate: new Date(moment().year(), moment().month(), moment().format('D')),
            yearRange: 5,
            bound: false,
            onSelect: function() {
              app.currentDate.year = this.getMoment().format('YYYY');
              app.currentDate.month = this.getMoment().format('MMMM');
              app.currentDate.day =  this.getMoment().format('DD');
              app.savedFoodView.initialize();
              app.savedFoodView.render();
            },
            container: document.getElementById('datepicker-container'),
        });

      // Initializes View which displays saved food
      app.savedFoodView = new app.SavedFoodView();
      this.render();

    },// initialize ends

    render: function(){
      this.chartDisplay();
    },

    chartDisplay: function(){

      $('#chartdiv').html('');
      var data = [[1, 20],[3,50],[5,13.1],[7,7],[9,38],[11,219.9]];

      $.jqplot('chartdiv',
        [
          data
        ],
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
