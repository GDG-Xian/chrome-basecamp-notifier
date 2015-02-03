define([
  "hbs!views/popup/templates/events",
  "views/popup/event",
  "marionette"
], function(EventsTpl, EventView, Marionette) {
  return Marionette.CompositeView.extend({
    template: EventsTpl,

    childViewContainer: "[data-js-identifier=events-container]",

    childView: EventView,

    ui: {
      loadMoreBtn: "[data-js-identifier=load-more-btn]"
    },

    events: {
      "click @ui.loadMoreBtn" : "loadMoreItems"
    },

    childEvents: {
      "star-event": "starEvent",
      "unstar-event": "unstarEvent"
    },

    loadMoreItems: function () {
      this.collection.fetchPreviousPage();
    }
  });
});
