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

lolApp.controller('SummonerDetailCtrl', ['$scope', '$routeParams', '$http', 'summonerService',
  function($scope, $routeParams, $http, summonerService) {
    $scope.summoner = summonerService.get({region: $routeParams.region, name: $routeParams.name});

    $scope.updateSummonerFromURL = function() {
      var responsePromise = $http.post('http://127.0.0.1:8001/summoner/ajax_query_start',
        {region: $routeParams.region, name: $routeParams.name});

      responsePromise.success(function(data, status, headers, config) {
        console.log('SUCCESS');
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
      });
      responsePromise.error(function(data, status, headers, config) {
        console.log('ERROR');
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
      })
    };
}]);

lolApp.controller('SummonerLookupCtrl', ['$scope', '$timeout', '$location', 'summonerService',
  function($scope, $timeout, $location, summonerService) {
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

    $scope.toSummonerDetail = function(region, name) {
      $location.path('/summoner/' + region + '/' + name);
    }

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