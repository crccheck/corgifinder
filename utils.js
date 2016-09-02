var grunt = require('grunt');
var packageJson = require('./package.json');
var path = require('path');
var swPrecache = require('sw-precache');

function writeServiceWorkerFile(rootDir, handleFetch, callback) {
  var config = {
    cacheId: packageJson.name,
    handleFetch: handleFetch,
    logger: grunt.log.writeln,
    staticFileGlobs: [
      rootDir + '/**.css',
      rootDir + '/**.html',
      rootDir + '/**.js',
      rootDir + '/embed/**.html',
      rootDir + '/img/**.*'
    ],
    stripPrefix: rootDir + '/',
    runtimeCaching: [{
      urlPattern: /^https:\/\/placecorgi.herokuapp.com\/300\/200/,  // FIXME more generic
      handler: function (request, values, options) {
        // https://googlechrome.github.io/sw-toolbox/docs/master/tutorial-usage
        return toolbox.networkFirst(request).catch(function() {
          return toolbox.cacheOnly(new Request('/img/avatar1.jpg'));
        });
      }
    }]
  };

  swPrecache.write(path.join(rootDir, 'service-worker.js'), config, callback);
}

module.exports.writeServiceWorkerFile = writeServiceWorkerFile;
