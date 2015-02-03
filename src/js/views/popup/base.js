define([
  "views/popup/account",
  "collections/listened_accounts",
  "marionette"
], function(AccountView, ListenedAccounts, Marionette) {
  return Marionette.CollectionView.extend({
    initialize: function () {
      this.collection = new ListenedAccounts();
      this.collection.fetch();
      console.log("dsa");
    },

    attachBuffer: function(collectionView, buffer) {
      collectionView.$el.html(buffer);
    },

    childView: AccountView
  });
});
