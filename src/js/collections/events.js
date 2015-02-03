define([
  "models/event",
  "collections/basecamp_notifier_collection",
  "backbone.dualstorage"
], function(
  Event,
  BasecampNotifierCollection
) {
  return BasecampNotifierCollection.extend({
    model: Event,

    initialize: function(models, options) {
      this.accountId = options.accountId;
      BasecampNotifierCollection.prototype.initialize.apply(this, arguments);
    },

    url: function () {
      return "https://basecamp.com/" + this.accountId + "/api/v1/events.json";
    },
    //
    // url: function () {
    //   if (!this.modifiedSince) {
    //     return this.urlRoot();
    //   } else {
    //     return this.urlRoot() + "?since=" + this.modifiedSince;
    //   }
    // },
    //
    comparator: function(model) {
      return -Date.parse(model.get("created_at"));
    }
  });
});
