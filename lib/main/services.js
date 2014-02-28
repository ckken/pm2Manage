angular.module('CrownApp.services', [])

    .service('hostService', ['$http', function ($http) {
        this.getHost = function (callback) {
            var url = 'http://112.124.64.160:9615/';
            $http.get(url).success(function (data) {
                callback(data);
            });
        },
        this.socketData = function(cb){
            var socket = io.connect("http://localhost:999");
            socket.on('watchPm2', function (data) {
                cb(data);
            });

        }
    }])
    .factory('socket', function($rootScope) {
        //var socket = io.connect(); // Connection to the server socket
        var socket = io.connect("http://www.wvovo.com:999");
        return {
            on: function(eventName, callback) { // Return callback to the actual function to manipulate it.
                socket.on(eventName, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        callback.apply(socket, args);
                    });
                });
            }
        };
    })
    .value('version', '0.1');