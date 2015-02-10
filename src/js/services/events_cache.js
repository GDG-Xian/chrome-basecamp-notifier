define([
  "services/configs_listened_accounts",
  "underscore"
], function(
  ConfigListenedAccounts
) {

  return {
    update: function (key, collection, override) {
      // var newCache;
      //
      // if (override) {
      //   newCache = collection;
      // } else {
      //   var actualCache = this.get(key);
      //   newCache = _.union(collection, actualCache);
      // }
      //
      // newCache = _.first(newCache, 40);
      //
      // var backgroundPage = chrome.extension.getBackgroundPage();
      //
      // if(!_.isObject(backgroundPage.eventsCache)) {
      //   backgroundPage.eventsCache = {};
      // }
      //
      // backgroundPage.eventsCache[key] = newCache;
      //
      // localStorage.setItem(key, JSON.stringify(newCache));
    },

    get: function (key) {
      // var backgroundPage = chrome.extension.getBackgroundPage();
      //
      // if(!_.isObject(backgroundPage.eventsCache)) {
      //   backgroundPage.eventsCache = {};
      // }
      //
      // if (!backgroundPage.eventsCache[key]) {
      //   var storedCache = localStorage.getItem(key);
      //
      //   if (!storedCache) {
      //     backgroundPage.eventsCache[key] = [];
      //   } else {
      //     backgroundPage.eventsCache[key] = JSON.parse(storedCache);
      //   }
      // }
      //
      // return backgroundPage.eventsCache[key];
    },

    clearAllCache: function () {
      // var backgroundPage = chrome.extension.getBackgroundPage();
      //
      // if(!_.isObject(backgroundPage.eventsCache)) {
      //   backgroundPage.eventsCache = {};
      // }
      //
      // _.each(ConfigListenedAccounts.listenedAccounts(), function (account) {
      //   localStorage.removeItem(account.href + "/events.json");
      //   backgroundPage.eventsCache[(account.href + "/events.json")] = [];
      // });
    }
  };
});
