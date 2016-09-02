var grunt = require('grunt');
var packageJson = require('./package.json');
var path = require('path');
var swPrecache = require('sw-precache');

function writeServiceWorkerFile(rootDir, handleFetch, callback) {
  var config = {
    cacheId: packageJson.name,
    // dynamicUrlToDependencies: {
    //   'dynamic/page1': [
    //     path.join(rootDir, 'views', 'layout.jade'),
    //     path.join(rootDir, 'views', 'page1.jade')
    //   ],
    //   'dynamic/page2': [
    //     path.join(rootDir, 'views', 'layout.jade'),
    //     path.join(rootDir, 'views', 'page2.jade')
    //   ]
    // },
    // If handleFetch is false (i.e. because this is called from swPrecache:dev), then
    // the service worker will precache resources but won't actually serve them.
    // This allows you to test precaching behavior without worry about the cache preventing your
    // local changes from being picked up during the development cycle.
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
    runtimeCaching: [
    ],
    // verbose defaults to false, but for the purposes of this demo, log more.
    verbose: true
  };

  swPrecache.write(path.join(rootDir, 'service-worker.js'), config, callback);
}

module.exports.writeServiceWorkerFile = writeServiceWorkerFile;
