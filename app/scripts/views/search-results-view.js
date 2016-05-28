var app = app || {};

(function(){
  'use strict';

  app.SearchResultView = Backbone.View.extend({
    el: '#search-results',
    colection: app.searchResultsCol,

    initialize: function(){
      this.listenTo(this.colection, 'add', this.addOne );
      this.$tbody = $('#search-results-data');

    },

    render: function(){
      this.$selectedFood.html('');
      this.colection.each(this.addOne, this);
  
    },

    // render: function(){
    //
    //   this.$tbody.html('');
    //   app.searchResultsCol.each(function(model){
    //
    //     var foodView = new app.FoodSingleView({model: model});
    //     this.$tbody.append(foodView.render().el);
    //   }.bind(this));
    //
    // //  return this;
    // },
    addOne: function(food){
      var foodView = new app.FoodSingleView({model: food});
      this.$tbody.append(foodView.render().el);
    }
  });

})();
