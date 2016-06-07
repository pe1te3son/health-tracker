var app = app || {};

(function($){

    'use strict';

  app.AppView = Backbone.View.extend({

    el: '#app',

    events: {
      'click .pika-day': 'render'
    },

    initialize: function(){
      var self = this;

      app.currentDate = {
        graphPrefix: moment().format('YYYY-M-'),
        year: moment().format('YYYY'),
        month: moment().format('MMMM'),
        day: moment().format('D'),
        daysThisMonth: moment().daysInMonth()
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
              // Each time new date is selected this function updates view
              app.currentDate.graphPrefix = this.getMoment().format('YYYY-M-'),
              app.currentDate.year = this.getMoment().format('YYYY');
              app.currentDate.month = this.getMoment().format('MMMM');
              app.currentDate.day =  this.getMoment().format('D');
              app.currentDate.daysThisMonth = this.getMoment().daysInMonth();
              app.savedFoodView.initialize();
              app.savedFoodView.render();

            },
            onDraw: function(){
              // Each time new month is selected this function rerenders graph
              var monthBeforeSelect = app.currentDate.month;
              app.currentDate.month = moment().month(this.calendars[0].month).format('MMMM');

              if(monthBeforeSelect != app.currentDate.month){
                self.showGraph();
              }

            },
            container: document.getElementById('datepicker-container'),
        });

      // Initializes View which displays saved food
      app.savedFoodView = new app.SavedFoodView();

      // Display graph
      self.showGraph();

      // Listens for window resize
      // Rebuilds Graph without fetching data each time as data are saved when showGraph() has been called
      $(window).on('resize', function(){
         app.helpers.buildGraph(self.dataForGraph);
      });

    },// initialize ends

    showGraph: function(){

      // Fetches data for Graph.

      var self = this;
      self.dataForGraph = [];
      app.graphCol = new app.GraphCol();
      app.graphCol.fetch({
        success: function(){
          for(var i=1; i<app.currentDate.daysThisMonth+1; i++){

            if(app.graphCol.get(i)){
              var calPerDay = parseFloat(app.graphCol.get(i).toJSON().caloriesToday.calories);
              var dayID = app.graphCol.get(i).toJSON().caloriesToday.day;
              var dateFormated = app.currentDate.graphPrefix + dayID;
              self.dataForGraph.push([dateFormated, calPerDay]);

            }else{
              self.dataForGraph.push([app.currentDate.graphPrefix + i , 0]);
            }

          }
          console.log(self.dataForGraph);
          // Build graph
          app.helpers.buildGraph(self.dataForGraph);

        },// success ends
        error: function(){
          console.log('fetching failed');
        }
      });

    }// showGraph ends


  });

})(jQuery);
