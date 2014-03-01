var CW = {};
angular.module('VcoApp', ['ngRoute','VcoApp.controllers', 'VcoApp.services', 'VcoApp.filters','VcoApp.directive','easypiechart','tools'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider

            .when('/', {
                templateUrl: 'partials/chart.html',
                controller: 'ChartCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
    .run(['$rootScope', '$route', '$http', function ($rootScope, $route, $http) {
        CW.url='http://112.124.64.160:9615';
        //CW.socket='http://www.wvovo.com:999';
        CW.socket='http://127.0.0.1:999';

        $rootScope.opt = [
            {barColor:'#FF530D', lineWidth:10 ,trackColor:'#888', lineCap:'round' ,scaleColor:false},
            {barColor:'#1F8A70',  lineWidth:10, trackColor:'#888',lineCap:'round' ,scaleColor:false},
            {barColor:'#FFFFFF', lineWidth:10, trackColor:'#888', lineCap:'round',scaleColor:false}
        ]


    }]);