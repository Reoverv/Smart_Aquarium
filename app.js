var http = require('http');
var fs = require('fs');
const path = require('path')
const express = require('express') //import express module
const app = express() //initialize express app
app.use(express.static('./public')) //the public folder with all your assets (index.html / styles / borwser js etc.)
var test = fs.readFileSync('index.html');



var SerialPort = require('serialport');

const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
    delimiter: '\r\n'
});

var port = new SerialPort('COM5', {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

port.pipe(parser);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html')) //index.html should be in the root of public folder else give the full path inside public folder


    var app = http.createServer(function(req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(test);
    });


    var io = require('socket.io').listen(app);

    io.on('connection', function(data) {
        console.log('nodejs is listening')
    });


    parser.on('data', function(data) {


        console.log(data);

        io.emit('data', data);
    });


    app.listen(3008)

})