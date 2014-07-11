'use strict';

/* Controllers */

var lolApp = angular.module('lolApp.controllers', []);

//lolApp
//  .controller('MyCtrl1', ['$scope', function($scope) {
//
//  }])
//  .controller('MyCtrl2', ['$scope', function($scope) {
//
//  }]);


lolApp.controller('ChampionCtrl', ['$scope', 'championService', function($scope, championService) {
  $scope.nameFilter = null;
  $scope.championList = [];

  championService.getChampions().success(function (response) {
    $scope.championList = response;
  })
}]);

lolApp.controller('SummonerListCtrl', ['$scope', 'SummonerService', function($scope, SummonerService) {
  $scope.summoners = SummonerService.get({region: 'euw'});
  $scope.orderProp = 'name';
}]);

lolApp.controller('SummonerDetailCtrl', ['$scope', '$routeParams', 'SummonerService',
  function($scope, $routeParams, SummonerService) {
    $scope.summoner = SummonerService.get({region: $routeParams.region, name: $routeParams.name});
}]);

lolApp.controller('SummonerLookupCtrl', ['$scope',
  function($scope) {
    return;
}]);

lolApp.controller('MatchHistoryCtrl', ['$scope', '$routeParams', 'MatchHistoryService',
  function($scope, $routeParams, MatchHistoryService) {
    $scope.games = MatchHistoryService.get({region: $routeParams.region, name: $routeParams.name});
}]);

lolApp.controller('ItemCtrl', ['$scope',
  function($scope) {
    return;
}]);