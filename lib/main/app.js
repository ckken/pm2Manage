var CW = {};
angular.module('CrownApp', ['ngRoute','CrownApp.controllers', 'CrownApp.services', 'CrownApp.filters','CrownApp.directive'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider

            .when('/', {
                templateUrl: 'partials/main.html?'+Math.random(),
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
    .run(['$rootScope', '$route', '$http', function ($rootScope, $route, $http) {
        CW = $rootScope;
        $rootScope.global = {
        }
    }]);