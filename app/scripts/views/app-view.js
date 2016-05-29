var app = app || {};

(function($){
  'use strict';

  app.AppView = Backbone.View.extend({
    el: '#app',

    events : {

    },

    initialize: function(){
      new app.SearchView();
    },

    
  });

})(jQuery);
