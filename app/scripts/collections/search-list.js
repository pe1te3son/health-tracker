var app = app || {};

(function(){
  var SearchList = Backbone.Collection.extend({
    model: app.Food,
    initialize: function(){
      this.listenTo(this, 'add', this.checkDuplicate)
    },

    checkDuplicate: function(food){

    }
  });

  app.searchList = new SearchList();
})();
