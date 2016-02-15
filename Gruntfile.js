module.exports = function(grunt) {
  function process(code, filepath) {
    return code

    // Embed version
    .replace(/@VERSION/g, grunt.config("pkg").version)

    // Embed date (yyyy-mm-ddThh:mmZ)
    .replace(/@DATE/g, (new Date()).toISOString().replace(/:\d+\.\d+Z$/, "Z"));
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    concat: {
      "src-js": {
        options: {
          process: process
        },
        src: [
          "src/canvas.js",
          "src/grid.js",
        ],
        dest: "dist/grid.js"
      }
    },

    uglify: {
      my_target: {
        options: {
          sourceMap: true
        },
        files: {
          'dist/grid.min.js': ['dist/grid.js']
        },
      },
    },

    run: {
      test: {
        cmd: 'npm',
        args: [
          'run',
          'test:only'
        ]
      }
    },

    watch: {
      files: ['src/**/*.js'],
      tasks: ['build'],
      options: {
        spawn: false,
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-run');

  grunt.registerTask("test", ["run:test"]);
  grunt.registerTask("watch:dev", ["watch"]);
  grunt.registerTask("build", ["concat"]);
  grunt.registerTask("default", ["concat", "uglify", "test"]);
};
