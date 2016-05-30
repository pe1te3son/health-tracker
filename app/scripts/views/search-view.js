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
      this.colection.setInputVal(this.$searchField.val());
      this.colection.fetch({
        error: function(){
          console.log('NO CONECTION');
        }
      });

      console.log(this.colection);
    },

    render: function(){
      console.log('rendering');

      this.$list.html('');

      this.colection.each(function(item){

        var foodview = new app.SearchSingleView({model: item});
        this.$list.append(foodview.render().el);

      }.bind(this));
    },

    foodClicked: function(food){
      console.log(food);
    }

  });
})(jQuery);
