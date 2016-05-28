var app = app || {};

var ENTER_KEY = 13;

$(function(){
  'use strict'

  // Custom method for Backbone view
  // Used to set data for each model saved to firebase
  Backbone.View.prototype.getTimeStampForMe = function(){
    var d = new Date();
    var strDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
    return strDate;
  };
  // Create an App
  new app.AppView();

});
