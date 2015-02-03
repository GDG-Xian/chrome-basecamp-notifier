define([
  "hbs!views/popup/templates/account",
  "views/popup/events",
  "models/user_token",
  "collections/events",
  "collections/starred_events",
  "marionette"
], function(AccountTpl, EventsView, UserToken, Events, StarredEvents, Marionette) {
  return Marionette.LayoutView.extend({
    template: AccountTpl,

    className: "account",

    regions: {
      eventsContainer: "[data-js-identifier=events-container]"
    },

    ui: {
      latestEventsLink: "[data-js-identifier=latest-events-tab-link]",
      starredEventsLink: "[data-js-identifier=starred-events-tab-link]"
    },

    events: {
      "click @ui.latestEventsLink": "renderLatestEvents",
      "click @ui.starredEventsLink": "renderStarredEvents"
    },

    initialize: function () {
      this.eventItems =
        new Events([], {
          accountId: this.model.get("id"),
          authToken: UserToken.current()
        });

      // this.eventItems.fetchAuthorized();
      this.eventItems.fetch({ remote: false });

      this.starredEvents =
        new StarredEvents([], { accountId: this.model.get("id") });

      this.starredEvents.fetch({ remote: false });

      this.listenTo(Backbone, this.model.get("id") + "-star-event", this.starEvent);
      this.listenTo(Backbone, this.model.get("id") + "-unstar-event", this.unstarEvent);
    },

    onRender: function () {
      this.renderLatestEvents();
    },

    renderLatestEvents: function() {
      var view = new EventsView({ collection: this.eventItems });

      this.eventsContainer.show(view);
    },

    renderStarredEvents: function() {
      var view = new EventsView({ collection: this.starredEvents });

      this.eventsContainer.show(view);
    },

    starEvent: function(eventItem) {
      eventItem.star();
      this.starredEvents.star(eventItem);
    },

    unstarEvent: function(eventItem) {
      eventItem.unstar();
      this.starredEvents.unstar(eventItem);
    }
  });
});
