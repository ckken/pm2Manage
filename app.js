var http = require("http"),
    port = 999,
    pm2Url = 'http://112.124.64.160:9615/';

var app = http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Welcome to Node.js!");
    response.end();
}).listen(port);

var io = require('socket.io').listen(app);
var request = require('request');
io.sockets.on('connection', function (socket) {

    getPM2(function(e,body){
        socket.emit('watchPm2',body);
    })

    var setID = setInterval(function(){
        getPM2(function(e,body){
            socket.emit('watchPm2',body);
        })
    },2000);

    socket.on('disconnect', function () {
        //clearInterval('setID');
    });

});

var getPM2 = function(cb){
    request({url:pm2Url, oauth:{}, json:true}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            cb(0,body);
        }else{
            cb(1,error);
        }
    })
}

console.log('daemon start on http://localhost'+port);