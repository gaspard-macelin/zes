module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },

    browserify: {
      dev: {
        src: ['src/js/index.js'],
        dest: 'dist/js/bundle.js'
      },
      production: {
        options: {
          debug: false
        },
        src: '<%= browserify.dev.src %>',
        dest: '<%= browserify.dev.dest %>'
      }
    },

    watch: {
      scripts: {
        files: ['src/js/index.js', 'src/js/**/*'],
        tasks: ['browserify'],
        options: {
          spawn: false,
        },
      },

      css: {
        files: ['src/styles/*', 'src/styles/**/*'],
        tasks: ['sass']
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> by <%= pkg.author %> */\n/*! Last Updated: <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= browserify.dev.dest %>',
        dest: '<%= browserify.dev.dest %>'
      }
    },

    sass: {
      options: {
        style: 'compressed',
        precision: 5
      },
      dist: {
        files: {
          'dist/css/styles.min.css': 'src/styles/project.scss'
        }
      },
    },

    browserSync: {
      bsFiles: {
        src : ['dist/css/*.css', '*.html', 'dist/js/*.js']
      },
      options: {
        watchTask: true,
        server: {
          baseDir: "./"
        }
      }
    }
  });

  // Load Browserify task for js dependencies management
  grunt.loadNpmTasks('grunt-browserify');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Compile SCSS Files to CSS
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Check for JS code quality
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Whatch for file changes and run default tasks
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Broser Sync Hot Reload
  grunt.loadNpmTasks('grunt-browser-sync');

  // Default task(s).
  grunt.registerTask('default', ['browserSync', 'uglify', 'jshint', 'watch']);

};
