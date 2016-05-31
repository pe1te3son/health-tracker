var app = app || {};

var ENTER_KEY = 13;

$(function(){
  'use strict'

  app.helpers = {
    getDateStamp: function(){
      var d = new Date();
      var strDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
      return strDate;
    }
  }


  // Create an App
  new app.AppView();

});
