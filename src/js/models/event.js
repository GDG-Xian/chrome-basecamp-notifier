define([
  "services/text",
  "models/user_token",
  "models/comment",
  "backbone",
  "backbone.computed-properties",
  "backbone.offline-attributes"
], function(
  Text,
  UserToken,
  Comment
) {
  return Backbone.Model.extend({
    offlineAttributes: ["viewed", "starred"],

    isCommentEvent: Backbone.Computed("type", function () {
      return this.get("type") == "comment";
    }),

    offlineAttributeStorageIdentifier: function() {
      return "eventOfflineAttributesStorage" + this.get("id");
    },

    star: function() {
      this.set({ starred: true });
    },

    unstar: function() {
      this.set({ starred: false });
    },

    /*
     * This part of code involving commnets isn't good, but the Basecamp unfortunately
     * don't put the comment ID in event, so many workarounds is needed in order
     * to get the ID of comment.
     */
    getCommentId: function () {
      var commentUrlPart = this.get("html_url").split("#")[1];

      if (!_.isUndefined(commentUrlPart)) {
        return commentUrlPart.split("_")[1];
      }
    },

    accountId: Backbone.Computed("url", function() {
      var accountIdExp = /[0-9]{7}/;
      return accountIdExp.exec(this.get("url"))[0];
    }),

    treatedSummary: Backbone.Computed("summary", function() {
      var treatedSummary = Text.stripTags(this.get("summary"));

      treatedSummary = Text.unescapeHTML(treatedSummary);

      var creatorNameLength = this.get("creator").name.length,
          summaryLength = 105 - creatorNameLength;

      return Text.truncate(treatedSummary, summaryLength, "...");
    }),

    comment: Backbone.Computed("html_url", "url", function () {
      return new Comment({
        id: this.getCommentId(),
        html_url: this.get("html_url")
      }, {
        userToken: UserToken.current(),
        url: this.get("url")
      });
    }),

    icon: Backbone.Computed("type", function() {
      var type = this.get("type"),
          typeInfos = this.constructor.types[type];

      if (type && typeInfos) {
        return typeInfos.icon;
      }
    }),

    // Basecamp doesn't send any event type flag so I need grab it from the
    // "action" attribute
    type: Backbone.Computed("action", function() {
      if (Text.contains(this.get("action"), "re-assigned a to-do")) {
        return "re_assign_todo";
      } else if (Text.contains(this.get("action"), "commented on")) {
        return "comment";
      } else if (Text.contains(this.get("action"), "moved a to-do")) {
        return "move_todo";
      } else if (Text.contains(this.get("action"), "added a to-do")) {
        return "add_todo";
      } else if (Text.contains(this.get("action"), "assigned a to-do")) {
        return "assign_todo";
      } else if (Text.contains(this.get("action"), "completed a to-do")) {
        return "complete_todo";
      } else if (Text.contains(this.get("action"), "gave") && Text.contains(this.get("action"), "access")) {
        return "gave_access";
      } else if (Text.contains(this.get("action"), "posted a message")) {
        return "message";
      } else if (Text.contains(this.get("action"), "deleted a to-do")) {
        return "delete_todo";
      } else if (Text.contains(this.get("action"), "deleted a comment")) {
        return "delete_comment";
      } else if (Text.contains(this.get("action"), "deleted a message")) {
        return "delete_message";
      } else if (Text.contains(this.get("action"), "changed a to-do")) {
        return "changed_todo";
      } else if (Text.contains(this.get("action"), "deleted an event")) {
        return "deleted_event";
      } else if (Text.contains(this.get("action"), "rescheduled an event")) {
        return "rescheduled_event";
      } else if (Text.contains(this.get("action"), "created a to-do list")) {
        return "create_todo_list";
      } else if (Text.contains(this.get("action"), "invited")) {
        return "invite";
      } else if (Text.contains(this.get("action"), "re-opened a to-do")) {
        return "reopened_todo";
      } else if (Text.contains(this.get("action"), "created an event")) {
        return "created_event";
      } else if (Text.contains(this.get("action"), "created a document")) {
        return "created_document";
      } else if (Text.contains(this.get("action"), "removed the assignment")) {
        return "removed_assignment";
      } else if (Text.contains(this.get("action"), "uploaded a file")) {
        return "uploaded_file";
      } else if (Text.contains(this.get("action"), "deleted a file")) {
        return "deleted_file";
      } else if (Text.contains(this.get("action"), "removed") && Text.contains(this.get("action"), "from the project")) {
        return "removed_permission_from_project";
      }
    })
  }, {
    types: {
      re_assign_todo: { label: "Re-Assigned a to-do", icon: "icon-retweet" },
      comment: { label: "Comments", icon: "icon-comment" },
      move_todo: { label: "Move to-do", icon: "icon-sort" },
      add_todo: { label: "Add to-do", icon: "icon-check-empty" },
      assign_todo: { label: "Assigns to-do", icon: "icon-male" },
      complete_todo: { label: "Completes to-do", icon: "icon-check" },
      gave_access: { label: "Gave Access", icon: "icon-key" },
      message: { label: "Post Messages", icon: "icon-envelope" },
      delete_todo: { label: "Delete to-do", icon: "icon-remove" },
      delete_comment: { label: "Delete Comment", icon: "icon-remove" },
      delete_message: { label: "Delete Message", icon: "icon-remove" },
      removed_permission_from_project: { label: "Remove permission from Project", icon: "icon-remove" },
      changed_todo: { label: "Change to-do", icon: "icon-exchange" },
      deleted_event: { label: "Delete Event", icon: "icon-remove" },
      rescheduled_event: { label: "Reschedule Event", icon: "icon-calendar-empty" },
      create_todo_list: { label: "Create to-do list", icon: "icon-list-ol" },
      invite: { label: "Invite to Project", icon: "icon-bullhorn" },
      removed_assignment: { label: "Remove assignment", icon: "icon-remove" },
      reopened_todo: { label: "Re-open a todo", icon: "icon-edit" },
      created_document: { label: "Create a document", icon: "icon-file-text" },
      created_event: { label: "Create an event", icon: "icon-calendar" },
      uploaded_file: { label: "Upload a file", icon: "icon-picture" },
      deleted_file: { label: "Delete a file", icon: "icon-remove" }
    }
  });
});
