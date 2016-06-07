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
          title:'Calories this month',
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
            { color:'#5FAB78'},

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
              label: 'Calories',
              labelRenderer: $.jqplot.CanvasAxisLabelRenderer
            }
          },
          cursor: {
            zoom: true
          },

        });

    },//buildGraph ends

    setFirstDay: function(){
      var startDay = app.currentDate.graphPrefix + '1';
      return startDay;
    },

    logInForm: function(){
      // Create a callback which logs the current auth state
      function authDataCallback(authData) {
        if (authData) {
          console.log('User ' + authData.uid + ' is logged in with ' + authData.provider);
        } else {
          console.log('User is logged out');
        }
      }
      // Register the callback to be fired every time auth state changes
      var ref = new Firebase(app.firebaseUrl);
      ref.onAuth(authDataCallback);
    }

  };
  app.userId = 'demo';
  // Create an App
  new app.AppView();
});
