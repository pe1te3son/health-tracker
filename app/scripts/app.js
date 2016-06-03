var app = app || {};

var ENTER_KEY = 13;

$(function(){
  'use strict';

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
          seriesDefaults: {
            rendererOptions: {
              smooth: true,
            },
            markerRenderer: $.jqplot.MarkerRenderer,
            markerOptions: {
              show: false
            }
          },

          series:[
            { color:'#5FAB78' }
          ],

          axes: {
            xaxis: {
              min: 1,
              max: app.currentDate.daysThisMonth,
              ticks: self.setTicks(),
              label: 'Days'

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

    setTicks: function(){
      var ticks = [];
      var remainder = app.currentDate.daysThisMonth % 2;

      if(window.innerWidth > 780){

        if(remainder === 0){
          for(var i=2; i<=app.currentDate.daysThisMonth; i+=2){
            ticks.push((i).toFixed(0));
          }
        }else{
          for(var i=1; i<=app.currentDate.daysThisMonth; i+=2){
            ticks.push((i).toFixed(0));
          }
        }

      }else{
        ticks = [(1).toFixed(0), (8).toFixed(0), (15).toFixed(0), (22).toFixed(0), app.currentDate.daysThisMonth.toFixed(0)];
      }

      return ticks;
    }
  };

  // Create an App
  new app.AppView();



});
