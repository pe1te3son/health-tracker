/**
    Search View
  ----------------
  This view is bind with search-list-col.js (colection). It mainly takes care of
  updating data which are retrieved from Nutritionix. It automaticly searches for
  food on each letter entered. Colection is formating recevied data.

*/
var app = app || {};

(function($){
  'use strict';

  app.SearchView = Backbone.View.extend({
    el: '#search-view',

    events: {
      'input #search-input': 'searchData'
    },

    initialize: function(){
      this.colection = new app.SearchListCol();
      this.$searchField = $('#search-input');
      this.$list = $('#search-result-list');
      this.listenTo(this.colection, 'sync', this.render);
    },

    searchData: function(){

      // Blocks page from reloading in case user presses Enter
      this.$searchField.keydown(function(e){
        if(e.which === ENTER_KEY){
          e.preventDefault();
        }
      });

      // Sets value of input field to collections
      this.colection.setInputVal(this.$searchField.val());

      // Then fetches a data
      this.colection.fetch({
        error: function(){
          console.log('NO CONECTION');
        }
      });
    },

    render: function(){
      console.log('rendering');

      this.$list.html('');

      this.colection.each(function(item){

        var foodview = new app.SearchSingleView({model: item});
        this.$list.append(foodview.render().el);

      }.bind(this));
    }

  });
})(jQuery);
