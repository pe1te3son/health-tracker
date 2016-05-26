var app = app || {};

(function(){
  'use strict';

  app.SearchResultView = Backbone.View.extend({
    el: '#search-results',

    initialize: function(){
      this.listenTo(app.searchResultsCol, 'update', this.render );
      this.$tbody = $('#search-results-data');
    },

    render: function(){

      this.$tbody.html('');
      app.searchResultsCol.each(function(model){

        var foodView = new app.FoodSingleView({model: model});
        this.$tbody.append(foodView.render().el);
      }.bind(this));

    //  return this;
    }
  });

})();
