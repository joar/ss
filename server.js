var express = require('express');
var http = require('http');
var net = require('net');

var app = express();
var httpServer = http.createServer(app);


app.get('/', function (req, res) {
    res.writeHead(200, {
        'Date': (new Date()).toUTCString(),
        'Connection': 'close',
        'Cache-Control': 'private',
        'Content-Type': 'video/webm',
        'Server': 'SS/0.1'
    });
    var client = new net.Socket();
    client.connect(8888, '0.0.0.0', function () {
        console.log('Connected to TCP server');
    });
    client.on('data', function (data) {
        res.write(data);
    })
    res.on('close', function () {
        client.destroy();
    })
});

httpServer.listen(8889);
