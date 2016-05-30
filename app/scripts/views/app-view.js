var app = app || {};

(function($){
  'use strict';

  app.AppView = Backbone.View.extend({
    el: '#app',

    events : {

    },

    initialize: function(){
      app.searchView = new app.SearchView();
      app.savedFoodView = new app.SavedFoodView();
    },

    

  });

})(jQuery);
