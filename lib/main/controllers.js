angular.module('CrownApp.controllers', [])


    .controller('MainCtrl', ['$scope', 'hostService','socket', function ($scope, hostService,socket) {
        socket.on('watchPm2', function (data) {

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
    }])