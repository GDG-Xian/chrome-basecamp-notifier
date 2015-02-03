require([
  "services/background",
  "services/config_page_mediator",
  "views/popup/base",
  "backbone",
  "app"
], function (
  Background,
  ConfigPageMediator,
  PopupView,
  Backbone,
  App
) {
  var view = $("body").data("view");

  if (view == "options") {
    ConfigPageMediator.mediate();
  } else if (view == "popup") {
    new PopupView({ el: "#content" }).render();
  } else if (view == "background") {
    // Background();
  }
});
