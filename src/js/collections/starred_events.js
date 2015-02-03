define([
  "backbone",
  "models/event",
  "backbone.dualstorage"
], function(Backbone, Event) {
  return Backbone.Collection.extend({
    model: Event,

    local: true,

    url: "local-collection",

    storeName: "starredItemsStorage",

    // initialize: function () {
    //   console.log("DSA");
    //   this.fetch({ remote: false });
    // },

    star: function (eventItem) {
      this.create(eventItem.toJSON());
    },

    unstar: function (eventItem) {
      var starredItem = this.findWhere({ id: eventItem.get("id") });

      if (!starredItem) {
        return;
      }

      this.remove(starredItem);
    },
    
    comparator: function(model) {
      return -Date.parse(model.get("created_at"));
    }
  });
});
