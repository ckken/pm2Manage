angular.module('CrownApp.controllers', [])


    .controller('MainCtrl', ['$scope', 'hostService','socket', function ($scope, hostService,socket) {

        /*        var gethost = function () {
         hostService.getHost(function (data) {
         $scope.data = data;
         var appMem = 0;
         angular.forEach(data.processes, function (v, k) {
         appMem += parseInt(v.monit.memory);
         });

         $scope.appMem = appMem;


         });
         }

         var t = setInterval(function () {
         gethost()
         }, 3000);
         gethost();*/

        socket.on('watchPm2', function (data) {
            //data = JSON.parse(data);
            var appMem = 0;
            angular.forEach(data.processes, function (v, k) {
                appMem += parseInt(v.monit.memory);
            });
            $scope.data = data;
            $scope.data.appMem = appMem;

        });

        $scope.$on('$destroy', function (event) {
            socket.removeAllListeners();
        });


        //$scope.$watch('data',function(){});


    }])


    .controller('ChartCtrl', ['$scope', 'hostService','socket','$filter','tools', function ($scope, hostService,socket,$filter,tools) {


        $scope.processes = [];

        socket.on('watchPm2', function (data) {

            var appMem = 0;
            $scope.data = data;
            var totalMem = $scope.data.monit.total_mem;

            angular.forEach(data.processes, function (v, k) {
                appMem += parseInt(v.monit.memory);
                v.memprecent = $filter('itempercent')(v.monit.memory,totalMem);
            });

            tools.union($scope.processes,data.processes);

            $scope.data.appMem = appMem;
            $scope.Mempercent = $filter('percent')($scope.data.monit.free_mem,totalMem);
            $scope.appMempercent = $filter('itempercent')($scope.data.appMem,totalMem);

        });


        $scope.$on('$destroy', function (event) {
            socket.removeAllListeners();
        })
    }])