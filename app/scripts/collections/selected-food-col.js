var app = app || {};

(function(){
  'use strict';

  var SelectedFoodCol = Backbone.Firebase.Collection.extend({
    model: app.FoodSingle,
    date: "1-1-1",
    url: function(){
      if(this.date != this.getTimeStampForMe() ){
        var d = this.getTimeStampForMe();
        this.date = d;
        return 'https://health-tracker-janak.firebaseio.com/selectedfood/'+d;
      }else{
        return 'https://health-tracker-janak.firebaseio.com/selectedfood/'+this.date;
      }

    },

    getTimeStampForMe: function(){
      var d = new Date();
      var strDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
      return strDate;
    }


  });
  app.selectedfoodCol = new SelectedFoodCol();



})();
