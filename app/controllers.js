angular.module('VcoApp.controllers', [])

    .controller('ChartCtrl', ['$scope','socket','$filter','tools', function ($scope,socket,$filter,tools) {
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