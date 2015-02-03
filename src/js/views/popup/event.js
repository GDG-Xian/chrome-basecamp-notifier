define([
  "hbs!views/popup/templates/event",
  "marionette"
], function(EventTpl, Marionette) {
  return Marionette.LayoutView.extend({
    template: EventTpl,

    tagName: "li",

    className: "event-view",

    modelEvents: {
      "change": "render"
    },

    regions: {
      commentContainer: "[data-js-identifier=comment-container]"
    },

    ui: {
      starButton: "[data-js-identifier=star-button]"
    },

    events: {
      "click": "onClick",
      "click @ui.starButton" : "toggleStar"
    },

    toggleStar: function(evt) {
      evt.stopPropagation();

      var messageChannel = this.model.get("accountId");

      messageChannel += this.model.get("starred") ?  "-unstar-event" : "-star-event";

      Backbone.trigger(messageChannel, this.model);
    },

    onClick: function() {
      if (this.model.get("isCommentEvent")) {
        this.renderComment();
      } else {
        this.sendToBasecamp();
      }
    },

    onRender: function() {
      if (!this.model.get("viewed")) {
        this.$el.addClass("unread");
      }
    },

    renderComment: function() {},

    sendToBasecamp: function() {
      chrome.tabs.create({ url: this.model.get("html_url") });
    }
  });
});
