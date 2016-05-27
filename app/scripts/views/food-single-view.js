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
      var d = new Date();
      var strDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
      var model = this.model.set({date: strDate, saved: true});
      app.selectedfoodCol.create(model.toJSON());
    },

    removeFromDatabase: function(){
      var self = this.model;
      self.destroy({
        wait: true,
        success: function(model){
          //console.log('deleted');
          console.log(model.cid + " removed");
        },
        error: function(){
          console.log('failed to remove');
        }
      });
    }

  });

})();
