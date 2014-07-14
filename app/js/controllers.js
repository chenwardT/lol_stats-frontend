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
    $scope.loading = false;

    // TODO: This should probably be in a service.
    $scope.updateSummonerFromURL = function() {
      $scope.loading = true;
      var responsePromise = $http({
        method: 'POST',
        url: 'http://127.0.0.1:8001/summoner/ajax_query_start',
        data: {region: $routeParams.region, name: $routeParams.name},
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
      });

      responsePromise.success(function(data, status) {
        console.log('success on updateSummonerFromURL...');
        console.log('data: ' + data);
        console.log('status: ' + status);

        // This is the task ID we query repeatedly to find out when the update is done.
        $scope.taskID = data;

        if (timerID) {
          clearInterval(timerID);
        }

        var timerID = setInterval(function() {
          var taskResponsePromise = $http({
            method: 'POST',
            url: 'http://127.0.0.1:8001/api/task_state',
            data: {task_id: $scope.taskID},
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            transformRequest: function (obj) {
              var str = [];
              for (var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              return str.join("&");
            }
          });

          taskResponsePromise.success(function(data, status) {
            console.log('success on taskResponsePromise...');
            // Django returns SUCCESS in double quotes here, so check for them...
            if(data=='"SUCCESS"') {
              console.log(data);
              console.log(status);
              clearInterval(timerID);
              $scope.loading = false;
            }
          });

          taskResponsePromise.error(function(data, status) {
            console.log('error on taskResponsePromise...');
            console.log(data);
            console.log(status);
          });
        }, 300);

      });
      responsePromise.error(function(data, status) {
        console.log('error on updateSummonerFromURL...');
        console.log('data: ' + data);
        console.log('status: ' + status);
      });

    };

    $scope.getTaskState = function(taskID) {
      var responsePromise = $http({
        method: 'POST',
        url: 'http://127.0.0.1:8001/api/task_state',
        data: {task_id: taskID},
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
      });

      responsePromise.success(function(data, status) {
        console.log('success on getTaskState...');
        console.log('data: ' + data);
        console.log('status: ' + status);
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