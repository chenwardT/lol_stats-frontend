'use strict';


// Declare app level module which depends on filters, and services
var lolApp = angular.module('lolApp', [
  'ngRoute',
  'ngResource',
  'lolApp.filters',
  'lolApp.services',
  'lolApp.directives',
  'lolApp.controllers'
]).
config(['$routeProvider', '$resourceProvider', function($routeProvider, $resourceProvider) {
  $routeProvider.when('/champions',
    {templateUrl: 'partials/champions.html', controller: 'ChampionCtrl'});
  $routeProvider.when('/items',
      {templateUrl: 'partials/items.html', controller: 'ItemCtrl'});
  $routeProvider.when('/summoner',
      {templateUrl: 'partials/summoner-lookup.html', controller: 'SummonerLookupCtrl'});
  $routeProvider.when('/summoner/:region/:name',
    {templateUrl: 'partials/summoner-detail.html', controller: 'SummonerDetailCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});

}]);