var CW = {};
//angular.module('CrownApp', ['CrownApp.controllers','CrownApp.filters','CrownApp.services','CrownApp.directives','hmTouchevents'])
angular.module('CrownApp', ['ngRoute','CrownApp.controllers', 'CrownApp.services', 'CrownApp.filters','CrownApp.directive','easypiechart'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider

            .when('/', {
                templateUrl: 'partials/main.html?'+Math.random(),
                controller: 'MainCtrl'
            })

            .when('/chart', {
                templateUrl: 'partials/chart.html?'+Math.random(),
                controller: 'ChartCtrl'
            })


            /*    .when('/:action/list', {
             templateUrl: 'partials/list.html',
             controller: 'ListCtrl'
             })
             .when('/:action/create', {
             templateUrl: 'partials/create.html',
             controller: 'CreateCtrl'
             })*/
            .otherwise({
                redirectTo: '/'
            });
    }])
    .run(['$rootScope', '$route', '$http', function ($rootScope, $route, $http) {
        CW = $rootScope;
        $rootScope.global = {
            //weatherData :[],
        }
        /*  $rootScope.global.prePercent = relocationService.prePercent();
         $rootScope.global.postPercent = relocationService.postPercent();
         $rootScope.global.Percent = relocationService.Percent();*/

    }]);