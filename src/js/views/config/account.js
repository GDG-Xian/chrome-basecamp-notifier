define([
  "text!templates/checkbox.html",
  "services/configs_listened_accounts",
  "backbone"
], function(CheckboxTpl, ConfigListenedAccounts) {
  return Backbone.View.extend({
    template: _.template(CheckboxTpl),

    events: {
      "click :checkbox": "updateStatus"
    },

    render: function() {
      var view = this.template({
        selected: this.selected(),
        label: this.model.getName()
      });

      this.setElement(view);

      return this.el;
    },

    selected: function() {
      return ConfigListenedAccounts.isListened(this.model);
    },

    updateStatus: function() {
      ConfigListenedAccounts.toggle(this.model);
      Backbone.trigger("configs_updated");
    }
  });
});
