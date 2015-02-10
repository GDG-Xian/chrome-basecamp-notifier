var config = require("grunt-settings");

module.exports = function (grunt) {
  var envMode = (grunt.option("environment") || "development"),
      pkg = grunt.file.readJSON("package.json");

  config.init(grunt);

  config.set("pkg", pkg);
  config.set("envMode", envMode);

  config.set("requirejs.compile.options", {
    name: "main",
    baseUrl: "./src/js",
    out: "dist/js/main.js",
    // generateSourceMaps: true,
    preserveLicenseComments: false,
    optimize: "none",
    paths: {
      "jquery": "vendor/jquery/jquery",
      "underscore": "vendor/underscore-amd/underscore",
      "backbone": "vendor/backbone-amd/backbone",
      "text": "vendor/text/text",
      "easytab": "vendor/easytabs/lib/jquery.easytabs",
      "marionette": "vendor/backbone.marionette/lib/backbone.marionette",
      "hbs": "vendor/require-handlebars-plugin/hbs",
      "backbone.dualstorage": "vendor/backbone.dualStorage/backbone.dualstorage.amd",
      "backbone.computed-properties": "vendor/backbone-computed-properties/src/backbone-computed",
      "backbone.offline-attributes": "vendor/backbone.offline-attributes/src/backbone.offline_attributes",
      "app": "app"
    },
    shim: {
      "easytab": {
        deps: ["jquery"]
      }
    }
  });

  config.set("copy.expand", {
    expand: true,
    cwd: "src/",
    src: [
      "**",
      "!js/**",
      "js/vendor/requirejs/require.js",
      "js/vendor/raven-js/dist/raven.js",
      "js/global.js"
    ],
    dest: "dist/",
    options: {
      mode: true
    }
  });

  config.set("clean.src", ["dist"]);

  config.set("env.src", ".<%= envMode %>-env");

  config.set("watch", {
    files: ["src/**/*.*", "Gruntfile.js"],
    tasks: ["build"],
    options: {
      spawn: false
    }
  });

  config.set("replace.files", {
    options: {
      variables: {
        "basecampClientId": "<%= process.env['BASECAMP_CLIENT_ID'] %>",
        "basecampSecret": "<%= process.env['BASECAMP_SECRET'] %>",
        "sentryUrl": "<%= process.env['SENTRY_URL'] %>",
        "version": "<%= pkg.version %>",
        "description": "<%= pkg.description %>"
      }
    },
    files: [
      {
        expand: true,
        src: [
          "dist/js/global.js",
          "dist/js/main.js",
          "dist/manifest.json"
        ]
      }
    ]
  });

  config.set("shell.zip", {
    command: "cd dist && zip -r basecamp_notifier_<%= pkg.version %>_<%= envMode %>.zip *"
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks("grunt-replace");
  grunt.loadNpmTasks("grunt-shell");
  grunt.loadNpmTasks("grunt-env");

  var buildSteps = [
    "env",
    "clean",
    "copy",
    "requirejs",
    "replace"
  ];

  config.registerTask("build", buildSteps);
  config.registerTask("pack", buildSteps.concat(["shell:zip"]));
};
