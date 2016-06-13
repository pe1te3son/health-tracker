var app = app || {};

(function($){

  'use strict';

  app.AppView = Backbone.View.extend({

    el: '#app',

    loginFormTemplate: _.template($('#login-form-template').html()),
    loginControlsTemplate: _.template($('#login-controls-template').html()),

    events: {
      'click #login': 'loginForm',
      'click #register': 'registerForm',
      'click #log-out': 'logOut'
    },

    initialize: function(){

      app.currentDate = {
        graphPrefix: moment().format('YYYY-M-'),
        year: moment().format('YYYY'),
        month: moment().format('MMMM'),
        day: moment().format('D'),
        dayOfWeek: moment().format('dddd'),
        daysThisMonth: moment().daysInMonth()
      };

      // Users Acounts
      app.firebaseUsers = new Firebase(app.firebaseUrl);

      // If User is not logged in, set "Default"
      this.healthTrackerCreateUser();

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
              // Stop all listeners in current saved food view
              // and then reintialize view with new database 
              app.savedFoodView.stopListening();
              app.savedFoodCollection = new app.FirebaseFoodCol();
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

      // Listens for window resize
      // Rebuilds Graph without fetching data each time as data are saved when user is created has been called
      $(window).on('resize', function(){
         app.helpers.buildGraph(app.dataForGraph);
      });
    },// initialize ends

    switchForms: function(container, attrVal){
      if(attrVal === 'none'){

        if(typeof container !== 'undefined'){
          container.slideUp('fast');
        }

      }else if(container.attr('data') === attrVal){
        container.slideUp('fast');
        container.attr('data', '');
      } else if(container.attr('data') !== attrVal && container.attr('data') != '' ){
        container.slideUp('fast').slideDown('fast');
        container.attr('data', attrVal);
      }else{
        container.attr('data', attrVal);
        container.slideDown('fast');
      }

    },

    loginForm: function(){
      var self = this;
      self.$registerBtn.removeClass('form-selected');
      self.$loginBtn.toggleClass('form-selected');
      self.$formContainer.html('').append(self.loginFormTemplate(
        {
          login: true,
          id: 'login'
        }
      ));

      $('#login-form').on('submit', function(e){
        e.preventDefault();
        app.helpers.spinner($('#spinner-cont'), 'insert');

        var $errorCont = $('.error-msg-cont');
        var $loginEmail = $('#inputEmail').val();
        var $loginPassword = $('#inputPassword').val();
        app.firebaseUsers.authWithPassword({
          email    : $loginEmail,
          password : $loginPassword
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
                  self.healthTrackerCreateUser();
                  app.savedFoodView.render();
                  app.showGraph();
              }

              app.helpers.spinner($('#spinner-cont'), 'remove');
          });
      });
      self.switchForms(self.$formContainer, 'login');

    },

    registerForm: function(){
      this.$loginBtn.removeClass('form-selected');

      if(!this.$registerBtn.hasClass('form-selected')){
        this.$registerBtn.addClass('form-selected');
      }else{
        this.$registerBtn.removeClass('form-selected');
      }

      this.$formContainer.html('').append(this.loginFormTemplate(
        {
          login: false,
          id: 'register'
        }
      ));

      $('#register-form').on('submit', function(e){
        e.preventDefault();
        app.helpers.spinner($('#spinner-cont'), 'insert');
        var $inputEmail = $('#inputEmail').val();
        var $inputPassword = $('#inputPassword').val();
        var $confirmPassword = $('#inputPasswordConfirm').val();
        var passwordsMatch = app.helpers.passwordMatch($inputPassword, $confirmPassword);

        if(passwordsMatch === true && $inputPassword.length >= 6){
          console.log('pass ok');
          app.firebaseUsers.createUser({
            email: $inputEmail,
            password: $inputPassword
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
            app.helpers.spinner($('#spinner-cont'), 'remove');
          });
        } else {
          console.log('password dont match or is not longer than 6 letters');
          app.helpers.spinner($('#spinner-cont'), 'remove');
        }// passwordsMatch

      }); // submit

        this.switchForms(this.$formContainer, 'register');
    },// registerForm ends

    logOut: function(){
      app.firebaseUsers.unauth();
      this.healthTrackerCreateUser();
      app.showGraph();
    },

    healthTrackerCreateUser: function(){
        this.authData = app.firebaseUsers.getAuth();
        var $loginControls = $('#login-controls');
        if(this.authData !== null){

          app.userId = this.authData.uid;
          $loginControls.html('').append(this.loginControlsTemplate({ loggedIn: true }));
          this.$logOutBtn = $('#log-out');
          app.savedFoodCollection = new app.FirebaseFoodCol();
          // Initializes View which displays saved food
          app.savedFoodView = new app.SavedFoodView();
          this.switchForms(this.$formContainer, 'none');

        }else{

          app.userId = 'default';
          $loginControls.html('').append(this.loginControlsTemplate({ loggedIn: false }));
          this.$formContainer = $('#form-cont');
          this.$registerBtn = $('#register');
          this.$loginBtn =   $('#login');
          app.savedFoodCollection = new app.FirebaseFoodCol();
          app.savedFoodView = new app.SavedFoodView();

        }

        app.showGraph();
    }

  });

})(jQuery);
