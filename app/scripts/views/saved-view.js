var app = app || {};

(function(){
  'use strict';
  
  app.SavedFoodView = Backbone.View.extend({
    el: '#saved-food-view',

    initialize: function(){
      this.colection = new app.FirebaseFoodCol();
      this.$list = $('#saved-food-list');
      this.listenTo(this.colection, 'remove', this.render);
      this.listenTo(this.colection, 'add', this.render);

    },

    render: function(){
      this.$list.html('');

      this.colection.each(function(item){

        var foodview = new app.SavedSingleView({model: item});
        this.$list.append(foodview.render().el);

      }.bind(this));
    },

    addOne: function(food){
      food.model.set({saved: true});
      this.colection.create(food.model.toJSON());
    }

  });
})();
