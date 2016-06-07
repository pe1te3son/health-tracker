var app = app || {};

(function($){

  'use strict';

  app.AppView = Backbone.View.extend({

    el: '#app',

    loginFormTemplate: _.template($('#login-form-template').html()),

    events: {
      'click #testone': 'render',
      'click #login': 'loginForm',
      'click #register': 'registerForm'
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

      app.firebaseUsers = new Firebase(app.firebaseUrl);

      // Initializes View which displays saved food
      app.savedFoodView = new app.SavedFoodView();

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


      // Display graph
      self.showGraph();

      // Listens for window resize
      // Rebuilds Graph without fetching data each time as data are saved when showGraph() has been called
      $(window).on('resize', function(){
         app.helpers.buildGraph(self.dataForGraph);
      });

    },// initialize ends

    loginForm: function(){
      $('#form-cont').html('').append(this.loginFormTemplate(
        {
          login: true,
          id: 'login'
        }
      ));

      $('#login-form').on('submit', function(e){
        e.preventDefault();

        var loginEmail = $('#inputEmail').val();
        var loginPassword = $('#inputPassword').val();
        app.firebaseUsers.authWithPassword({
          email    : loginEmail,
          password : loginPassword
        }, function (error, authData) {
              if (error) {
                  switch (error.code) {
                      case 'INVALID_EMAIL':
                          console.log('The specified user account email is invalid.');
                          break;
                      case 'INVALID_PASSWORD':
                          console.log('The specified user account password is incorrect.');
                          break;
                      case 'INVALID_USER':
                          console.log('The specified user account does not exist.');
                          break;
                      default:
                          console.log('Error logging user in:', error);
                  }
              } else {
                  console.log('loged in');
              }
          });
      });


    },

    registerForm: function(){
      $('#form-cont').html('').append(this.loginFormTemplate(
        {
          login: false,
          id: 'register'
        }
      ));

    },

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
