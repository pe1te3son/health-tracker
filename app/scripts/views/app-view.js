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
      this.$formContainer = $('#form-cont');
      app.userId = 'default';
      app.currentDate = {
        graphPrefix: moment().format('YYYY-M-'),
        year: moment().format('YYYY'),
        month: moment().format('MMMM'),
        day: moment().format('D'),
        dayOfWeek: moment().format('dddd'),
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
              app.currentDate.dayOfWeek =  this.getMoment().format('dddd');
              app.currentDate.daysThisMonth = this.getMoment().daysInMonth();
              app.savedFoodView.initialize();
              app.savedFoodView.render();

            },
            onDraw: function(){
              // Each time new month is selected this function rerenders graph
              var monthBeforeSelect = app.currentDate.month;
              app.currentDate.month = moment().month(this.calendars[0].month).format('MMMM');

              if(monthBeforeSelect != app.currentDate.month){
                app.showGraph();
              }

            },
            container: document.getElementById('datepicker-container'),
        });

      // Display graph
      app.showGraph();

      // Listens for window resize
      // Rebuilds Graph without fetching data each time as data are saved when showGraph() has been called
      $(window).on('resize', function(){
         app.helpers.buildGraph(app.dataForGraph);
      });

    },// initialize ends

    loginForm: function(){
      this.$formContainer.html('').append(this.loginFormTemplate(
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
                  app.userId = authData.uid;
                  app.savedFoodView = new app.SavedFoodView();
                  app.savedFoodView.render();
                  app.showGraph();
              }
          });
      });


    },

    registerForm: function(){
      this.$formContainer.html('').append(this.loginFormTemplate(
        {
          login: false,
          id: 'register'
        }
      ));

      $('#register-form').on('submit', function(e){
        e.preventDefault();

        var inputEmail = $('#inputEmail').val();
        var inputPassword = $('#inputPassword').val();
        var confirmPassword = $('#inputPasswordConfirm').val();
        var passwordsMatch = app.helpers.passwordMatch(inputPassword, confirmPassword);

        if(passwordsMatch === true){
          console.log('pass ok');
          app.firebaseUsers.createUser({
            email: inputEmail,
            password: inputPassword
          }, function(error, userData) {
            if (error) {
              switch (error.code) {
                case 'EMAIL_TAKEN':
                  console.log('The new user account cannot be created because the email is already in use.');
                  break;
                case 'INVALID_EMAIL':
                  console.log('The specified email is not a valid email.');
                  break;
                default:
                  console.log('Error creating user:', error);
              }
            } else {
              console.log('Successfully created user account with uid:', userData.uid);
            }
          });
        } else {
          console.log('password dont match');
        }// passwordsMatch

      }); // submit

    }// registerForm ends

  });

})(jQuery);
