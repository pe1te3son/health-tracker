var app = app || {};

(function(){
  'use strict';

  app.FoodSingleView = Backbone.View.extend({
    tagName: 'tr',

    foodTemplate: _.template($('#food-single-template').html()),

    events: {
      'click .add-btn': 'addToDatabase',
      'click .remove-btn': 'removeFromDatabase'
    },

    render: function() {
      this.$el.html(this.foodTemplate(this.model.attributes));
      return this;
    },

    addToDatabase: function(){

      var model = this.model.set({date: this.getTimeStampForMe(), saved: true});
      app.selectedfoodCol.create(model.toJSON());
      console.log(model);
    },

    removeFromDatabase: function(){
      var self = this.model;
      self.destroy({
        wait: true,
        success: function(model){
          console.log(model.cid + " removed");
        },
        error: function(){
          console.log('failed to remove');
        }
      });
    }

  });

})();
