'use strict';

/* Directives */

var lolApp = angular.module('lolApp.directives', []);

lolApp.directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}]);

lolApp.directive('summonerBasicInfo', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/summoner-basic-info.html'
  };
});

// Render a gameBox
lolApp.directive('recentGame', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/recent-game.html'
  };
});