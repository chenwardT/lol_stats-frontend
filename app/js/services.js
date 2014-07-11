'use strict';

/* Services */

var lolApp = angular.module('lolApp.services', ['ngResource']);

// Demonstrate how to register services
// In this case it is a simple value service.
lolApp.value('version', '0.1');


lolApp.factory('championService', function($http) {

  var championAPI = {};

  championAPI.getChampions = function () {
    return $http({
      method: 'GET',
      url: 'http://127.0.0.1:8001/api/champions'
    });
  }

  return championAPI;
});

lolApp.factory('SummonerService', ['$resource', function($resource) {
  return $resource('http://127.0.0.1:8001/api/summoners/:region/:name',
    {region: '@region', name: '@name'}
  );
}]);

lolApp.factory('MatchHistoryService', ['$resource', function($resource) {
  return $resource('http://127.0.0.1:8001/api/games/:region/:name',
    {region: '@region', name: '@name'}
  );
}]);

lolApp.factory('SummonerUpdateService', ['$resource', function($resource) {
  return $resource('')
}])