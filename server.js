var express = require('express');
var http = require('http');
var net = require('net');
var dns = require('dns');

var app = express();
var httpServer = http.createServer(app);


app.get('/stream', function (req, res) {
    res.writeHead(200, {
        'Date': (new Date()).toUTCString(),
        'Connection': 'close',
        'Cache-Control': 'private',
        'Content-Type': 'video/webm',
        'Server': 'SS/0.1'
    });

    var clientIP = req.connection.remoteAddress;
    var clientHost;
    var clientSent = 0;

    console.log('Client connected, ip:', clientIP);

    setInterval(function () {
        console.log('Sent ', clientSent, 'bytes to', clientIP || clientHost);
    }, 5000)

    dns.reverse(clientIP, function (err, domains) {
        console.log('Got DNS response for clientIP:', domains, err);
        var clientHost = domains;
    })

    var stream = new net.Socket();

    stream.connect(8888, '0.0.0.0', function () {
        console.log('Connected to TCP stream.');
    });

    stream.on('data', function (data) {
        clientSent += data.length;
        res.write(data);
    })

    res.on('close', function () {
        console.log('Closing connection for client', clientHost || clientIP);
        stream.destroy();
    })
});

httpServer.listen(8889);
