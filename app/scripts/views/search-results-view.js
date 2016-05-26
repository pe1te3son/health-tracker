var app = app || {};

(function(){
  'use strict';

  app.SearchResultView = Backbone.View.extend({
    el: '#search-results-list',

    initialize: function(){
      this.listenTo(app.searchResultsCol, 'update', this.render );
    },

    render: function(){

      this.$el.html('');
      app.searchResultsCol.each(function(model){

        var foodView = new app.FoodSingleView({model: model});
        this.$el.append(foodView.render().el);
      }.bind(this));

    //  return this;
    }
  });

})();
