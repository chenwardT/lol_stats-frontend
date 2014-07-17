'use strict';

/* Filters */

var lolApp = angular.module('lolApp.filters', []);

lolApp.filter('interpolate', ['version', function(version) {
  return function(text) {
    return String(text).replace(/\%VERSION\%/mg, version);
  };
}]);

lolApp.filter('gameDuration', function() {
  return function(sec) {
    var mm = sec / 60;

    return mm.toFixed(0);
  };
});