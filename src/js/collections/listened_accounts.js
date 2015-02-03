define(["backbone", "backbone.dualstorage"], function(Backbone) {
  return Backbone.Collection.extend({
    local: true,

    url: "local-collection",

    storeName: "listenedAccountsStorage"
  });
});
