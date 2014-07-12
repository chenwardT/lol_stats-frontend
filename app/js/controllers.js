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

lolApp.controller('HomeCtrl', ['$scope', function($scope) {

}]);

lolApp.controller('ChampionCtrl', ['$scope', 'championService', function($scope, championService) {
  $scope.nameFilter = null;
  $scope.championList = [];

  championService.getChampions().success(function (response) {
    $scope.championList = response;
  })
}]);

lolApp.controller('SummonerListCtrl', ['$scope', 'summonerService', function($scope, summonerService) {
  $scope.summoners = summonerService.get({region: 'euw'});
  $scope.orderProp = 'name';
}]);

lolApp.controller('SummonerDetailCtrl', ['$scope', '$routeParams', 'summonerService',
  function($scope, $routeParams, summonerService) {
    $scope.summoner = summonerService.get({region: $routeParams.region, name: $routeParams.name});
}]);

lolApp.controller('SummonerLookupCtrl', ['$scope', '$timeout', 'summonerService',
  function($scope, $timeout, summonerService) {
    var timeout;

    $scope.$watch('name', function(newName) {
      if (newName) {
        // If there is a timeout already in progress
        if (timeout) $timeout.cancel(timeout);

        timeout = $timeout(function() {
          $scope.summonerInfo = summonerService.get({region: $scope.region, name: newName})
        }, 350);
      }
    });

//    $scope.$watch('name', function(newName) {
//      $scope.summonerInfo = summonerService.get({region: $scope.region, name: newName});
//    });

//    $scope.summonerInfo = summonerService.get({region: 'na', name: 'ronfar'});
}]);

lolApp.controller('MatchHistoryCtrl', ['$scope', '$routeParams', 'matchHistoryService',
  function($scope, $routeParams, matchHistoryService) {
    $scope.games = matchHistoryService.get({region: $routeParams.region, name: $routeParams.name});
}]);

lolApp.controller('ItemCtrl', ['$scope',
  function($scope) {
    return;
}]);