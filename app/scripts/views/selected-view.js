var app = app || {};

(function($){
  'use strict';
  app.SelectedView = Backbone.View.extend({

    el: '#daily-result-cont',

    initialize: function(){
      this.$list = $('.daily-list');
      this.listenTo(app.foodList, 'update', this.addAll );
    },

    addOne: function (item) {
      var view = new app.FoodView({ model: item });
      this.$list.append(view.render().el);
    },

    addAll: function () {
			this.$list.html('');
			app.foodList.each(this.addOne, this);
		}

  });
})(jQuery);
