utils = require('./utils')

module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    sass:
      options:
        includePaths: [
          'node_modules/normalize.sass',
        ]
      dist:
        files:
          'app/app.css': 'src/styles/main.scss'
    postcss:
      options:
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'}),
        ]
      dist:
        src: 'app/app.css'

    browserify:
      dist:
        options:
          transform: ['babelify']
        files:
          'app/app.js': ['src/js/main.js']
    swPrecache:
      dev:
        handleFetch: false
        rootDir: 'app'

    watch:
      options:
        livereload: true
      style:
        files: ['src/styles/*.s?ss']
        tasks: ['sass']
        options:
          livereload: false
          spawn: true
      css:
        files: ['app/**/*.css']
      scripts:
        files: ['src/js/**/*.js']
        tasks: ['browserify']
        options:
          spawn: false
      html:
        files: ['app/**/*.html']
    connect:
      server:
        options:
          base: 'app'
          livereload: true
          open: true

  grunt.loadNpmTasks 'grunt-sass'
  grunt.loadNpmTasks 'grunt-postcss'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-connect'

  grunt.registerTask 'default', ['build']
  grunt.registerTask 'dev', ['connect', 'build', 'watch']
  grunt.registerTask 'build', ['sass', 'postcss', 'browserify']

  grunt.registerMultiTask 'swPrecache', () ->
    done = this.async()
    rootDir = this.data.rootDir
    handleFetch = this.data.handleFetch
    utils.writeServiceWorkerFile rootDir, handleFetch, (error) ->
      if error
        grunt.fail.warn(error)
      done()
