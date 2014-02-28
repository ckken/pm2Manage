angular.module('VcoApp.services', [])

    .factory('socket', function($rootScope) {
        var socket = io.connect(CW.socket);
        return {
            on: function(eventName, callback) {
                socket.on(eventName, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        callback.apply(socket, args);
                    });
                });
            }
        };
    })
