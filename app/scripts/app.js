var app = app || {};

var ENTER_KEY = 13;

$(function(){
  'use strict';
  app.firebaseUrl = 'https://health-tracker-janak.firebaseio.com/';

  Backbone.View.prototype.close = function() {
    this.undelegateEvents();
    //this.remove();
  };

  app.helpers = {
    buildGraph: function(data){
      var self = this;

      $('#chartdiv').html('');
      $.jqplot('chartdiv',
        [
          data
        ],
        {
          title:{
            text: 'Calories ' + app.currentDate.month + ' ' + app.currentDate.year,
            textColor: '#000',
            fontFamily: '"Ubuntu", "sans-serif"'
          },
          // Turns on animatino for all series in this plot.
          animate: true,
          animateReplot: true,
          seriesDefaults: {
            rendererOptions: {

              animation: {
                  speed: 4000
              }
            },
            markerRenderer: $.jqplot.MarkerRenderer,
            markerOptions: {
              show: false
            }
          },
          axesDefaults: {
               tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
               tickOptions: {
                 textColor: '#000'
               }
           },

          series:[
            { color:'#A9ADD3'},

          ],

          axes: {
            xaxis: {
              renderer:$.jqplot.DateAxisRenderer,
              //tickRenderer: $.jqplot.AxisTickRenderer,
              tickOptions:{formatString:'%b %#d'},
              min: self.setFirstDay()
            },
            yaxis: {
              min: 0,

            }
          },
          cursor: {
            show: true,
            zoom: true,
            looseZoom: false,
            showHorizontalLine: true,
          },
          grid: {
            background: '#ffffff'
          },


        });
        $.jqplot.config.enablePlugins = true;
    },//buildGraph ends

    setFirstDay: function(){
      var startDay = app.currentDate.graphPrefix + '1';
      return startDay;
    },

    passwordsMatch: function(pass1, pass2){
      if(pass1 === pass2){
        return true;
      }else{
        return false;
      }
    },

    spinner: function($container, $option){
      /**
        * @desc adds or removes spinner
        * @param jquery selector $container - select where to append spinner
        * @param string $option - choose what to do, its either 'insert' or 'remove'
      */

      var cont = $container;
      var opt = $option;

      if(opt === 'insert'){
        cont.append('<i class="fa fa-spinner fa-spin fa-lg"></i><span class="sr-only">Loading...</span>');
      } else if(opt === 'remove'){
        cont.html('');
      }

    }

  };

  app.showGraph = function(){

    // Fetches and displays Graph data.

    var self = this;
    app.dataForGraph = [];
    app.graphCol = new app.GraphCol();
    app.graphCol.fetch({
      success: function(){
        for(var i=1; i<app.currentDate.daysThisMonth+1; i++){

          if(app.graphCol.get(i)){
            var calPerDay = parseFloat(app.graphCol.get(i).toJSON().caloriesToday.calories);
            var dayID = app.graphCol.get(i).toJSON().caloriesToday.day;
            var dateFormated = app.currentDate.graphPrefix + dayID;
            app.dataForGraph.push([dateFormated, calPerDay]);

          }else{
            app.dataForGraph.push([app.currentDate.graphPrefix + i , 0]);
          }

        }
        // Build graph
        app.helpers.buildGraph(app.dataForGraph);
        $('#chartdiv').addClass('animated fadeInUp');

      },// success ends
      error: function(){
        console.log('fetching failed');
      }
    });

  }// showGraph ends

  // Create an App
  new app.AppView();
});
