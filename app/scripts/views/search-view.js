/**
  * Search View
  *  @desc This view is bind with search-list-col.js (collection). It mainly takes care of
  *  updating data which are retrieved from Nutritionix. It automaticly searches for
  *  food on each letter entered. Collection is formating recevied data.

*/
var app = app || {};

(function($){
  'use strict';

  app.SearchView = Backbone.View.extend({
    el: '#search-view',

    events: {
      'input #search-input': 'searchData',
      'click #datepicker-btn': 'showCalendar',
      'click #search-list-btn': 'showSearchList',
      'click #search-menu-toggle-btn': 'toggleSearchResults'
    },

    initialize: function(){
      this.collection = new app.SearchListCol();
      this.$searchControls = $('.search-controls');
      this.$searchField = $('#search-input');
      this.$list = $('#search-result-list');
      this.$listContainer = $('.search-result-cont');
      this.$datepicker = $('#datepicker');
      this.listenTo(this.collection, 'sync', this.render);
      this.$datepickerBtn = $('#datepicker-btn');
      this.$searchListBtn = $('#search-list-btn');
      this.$searchMenuToggleBtn = $('#search-menu-toggle-btn').children().first();
    },

    searchData: function(){
      var self = this;

      this.showSearchList();
      this.$list.html('');
      app.helpers.spinner(this.$list, 'insert');
      // Blocks page from reloading in case user presses Enter
      this.$searchField.keydown(function(e){
        if(e.which === ENTER_KEY){
          e.preventDefault();
        }
      });

      // Sets value of input field to collections
      this.collection.setInputVal(this.$searchField.val());

      // Then fetches a data
      this.collection.fetch({
        error: function(){
          console.log('NO CONECTION');
          self.$list.html('');
          self.$list.append('<h2>Oops, something went wrong!</h2><p>Please try later or reload the page.</p>');
        }
      });
    },

    render: function(){

      this.$list.html('');

      this.collection.each(function(item){

        var foodview = new app.SearchSingleView({model: item});
        this.$list.append(foodview.render().el);

      }.bind(this));

      if(!this.$searchMenuToggleBtn.hasClass('fa-angle-double-up')){
        this.$searchMenuToggleBtn.addClass('fa-angle-double-up').removeClass('fa-angle-double-down');
        this.$list.slideDown('fast');
      }

    },

    showCalendar: function(e){
      this.$searchListBtn.removeClass('selected-panel');
      this.$datepickerBtn.addClass('selected-panel');
      this.$datepicker.show();
      this.$listContainer.hide();

    },

    showSearchList: function(){
      this.$datepickerBtn.removeClass('selected-panel');
      this.$searchListBtn.addClass('selected-panel');
      this.$datepicker.hide();
      this.$listContainer.show();
    },

    toggleSearchResults: function(e){
      this.$searchMenuToggleBtn.toggleClass('fa-angle-double-up fa-angle-double-down');
      this.$list.slideToggle('fast');
    }

  });
})(jQuery);
