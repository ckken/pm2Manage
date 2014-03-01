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
var Member = [],client = {},client_id=[],online=0,ips=[];

io.sockets.on('connection', function (socket) {



    client = {
        time:getTime(),
        ip:socket.handshake.address.address,
        port:socket.handshake.address.port,
        sid:socket.id,
        agent:socket.handshake.headers['user-agent']
    };
    client_id[socket.id]=Member.length;
    if(!ips[client.ip]){
        ips[client.ip]=true;
        online++;
    }

    Member.push(client);

    socket.on('disconnect', function () {
        clearInterval('setID');
        Member.splice(client_id[socket.id],1);
    });


    var setID = setInterval(function(){
        getPM2(function(e,body){
            socket.emit('watchPm2',body);
        })
    },2000);


    var getPM2 = function(cb){
        request({url:pm2Url, oauth:{}, json:true}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                body.member = Member;
                body.client =Member[client_id[socket.id]];
                body.online = online;
                cb(0,body);
            }else{
                cb(1,error);
            }
        })
    }

    getPM2(function(e,body){
        socket.emit('watchPm2',body);
    })

});




var getTime=function(){
    var date = new Date();
    return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}

console.log('daemon start on http://localhost'+port);