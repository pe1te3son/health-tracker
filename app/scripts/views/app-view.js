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
              var monthBeforeSelect = app.currentDate.month;
              app.currentDate.year = this.getMoment().format('YYYY');
              app.currentDate.month = this.getMoment().format('MMMM');
              app.currentDate.day =  this.getMoment().format('D');
              app.currentDate.daysThisMonth = this.getMoment().daysInMonth();
              app.savedFoodView.initialize();
              app.savedFoodView.render();
              console.log(app.currentDate.daysThisMonth);

              if(monthBeforeSelect != this.getMoment().format('MMMM')){
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

      // This function fetches data for Graph.
      // It saves  data in this View so it can be reused on window resize.

      var self = this;
      self.dataForGraph = [];
      app.graphCol = new app.GraphCol();
      app.graphCol.fetch({
        success: function(){
          for(var i=0; i<app.currentDate.daysThisMonth; i++){

            if(app.graphCol.get(i)){
              var calPerDay = app.graphCol.get(i).toJSON().caloriesToday.calories;
              var dayID = app.graphCol.get(i).toJSON().caloriesToday.day;
              self.dataForGraph.push([dayID ,calPerDay]);

            }else{
              self.dataForGraph.push([i+1 , 0]);
            }

          }

          if(self.dataForGraph.length > 0){
            app.helpers.buildGraph(self.dataForGraph);
          }else{
            app.helpers.buildGraph([[1, 0]]);
          }

        },// success ends
        error: function(){
          console.log('fetching failed');
        }
      });

    }// showGraph ends


  });

})(jQuery);
