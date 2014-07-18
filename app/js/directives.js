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

lolApp.directive('itemName', function() {
  return {
  };
});

lolApp.directive('gameItems', function() {
  return {
    restrict: 'E',
    scope: {
      game: '=game'
    },
    templateUrl: 'partials/game-items.html'
  };
});

lolApp.directive('gameItem', function() {
  return {
    restrict: 'E',
    template: '<div class="item0" style={{game.stats.item0|itemOrBlank}}><div style="width: 32px; height: 32px; display: inline-block"></div></div>' +
              '<div class="item1" style={{game.stats.item1|itemOrBlank}}><div style="width: 32px; height: 32px; display: inline-block"></div></div>' +
              '<div class="item2" style={{game.stats.item2|itemOrBlank}}><div style="width: 32px; height: 32px; display: inline-block"></div></div>' +
              '<div class="item3" style={{game.stats.item3|itemOrBlank}}><div style="width: 32px; height: 32px; display: inline-block"></div></div>' +
              '<div class="item4" style={{game.stats.item4|itemOrBlank}}><div style="width: 32px; height: 32px; display: inline-block"></div></div>' +
              '<div class="item5" style={{game.stats.item5|itemOrBlank}}><div style="width: 32px; height: 32px; display: inline-block"></div></div>'
  };
});