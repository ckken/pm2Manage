var http = require("http"),
    port = 999,
    host = '112.124.64.160:9615',
    pm2Url = 'http://'+host;

var app = http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Welcome to Node.js!");
    response.end();
}).listen(port);

var io = require('socket.io').listen(app,{log:false});
var request = require('request');
var Member = [],client={};


io.sockets.on('connection', function (socket) {



    client = {
        time:getTime(),
        ip:socket.handshake.address.address,
        port:socket.handshake.address.port,
        sid:socket.id,
        agent:socket.handshake.headers['user-agent']
    };
    var client_id = Member.length;
    Member.push(client);


    getPM2(function(e,body){
        socket.emit('watchPm2',body);
    })

    var setID = setInterval(function(){
        getPM2(function(e,body){
            socket.emit('watchPm2',body);
        })
    },2000);

    socket.on('disconnect', function () {
        clearInterval('setID');
        Member.splice(1,client_id);
    });

});

var getPM2 = function(cb){
    request({url:pm2Url, oauth:{}, json:true}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            body.member = Member;
            body.client =client;
            cb(0,body);
        }else{
            cb(1,error);
        }
    })
}


var getTime=function(){
    var date = new Date();
    return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}

/*//区分用户颜色
var getColor=function(){
    var colors = ['aliceblue','antiquewhite','aqua','aquamarine','pink','red','green',
        'orange','blue','blueviolet','brown','burlywood','cadetblue'];
    return colors[Math.round(Math.random() * 10000 % colors.length)];
}*/

console.log('daemon start on http://localhost'+port);