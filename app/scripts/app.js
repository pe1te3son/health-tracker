var app = app || {};

var ENTER_KEY = 13;

$(function(){
  'use strict';
  app.firebaseUrl = 'https://health-tracker-janak.firebaseio.com/';
  app.helpers = {
    buildGraph: function(data){
      var self = this;

      $('#chartdiv').html('');
      $.jqplot.config.enablePlugins = true;
      $.jqplot('chartdiv',
        [
          data
        ],
        {
          title:{
            text: 'Calories ' + app.currentDate.month + ' ' + app.currentDate.year,
            textColor: '#3F5668'
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

          series:[
            { color:'#F39D56'},

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
          }

        });

    },//buildGraph ends

    setFirstDay: function(){
      var startDay = app.currentDate.graphPrefix + '1';
      return startDay;
    },

    passwordMatch: function(pass1, pass2){
      if(pass1 === pass2){
        return true;
      }else{
        return false;
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

      },// success ends
      error: function(){
        console.log('fetching failed');
      }
    });

  }// showGraph ends

  // Create an App
  new app.AppView();
});
