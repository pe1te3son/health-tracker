var app = app || {};

var ENTER_KEY = 13;

$(function(){
  'use strict'

  app.helpers = {
    buildGraph: function(data){

      $('#chartdiv').html('');

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
                  min: 1,
                  label: 'Days'

              },
              yaxis: {
                  min: 0,
                  label: 'Calories',
                  labelRenderer: $.jqplot.CanvasAxisLabelRenderer
              }
          },
        });
    }//buildGraph ends
  };

  // Create an App
  new app.AppView();


});
