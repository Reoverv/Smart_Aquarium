var http = require('http');
var fs = require('fs');
const path = require('path')
const socketio = require('socket.io');
var express = require('express');

const app = express() //initialize express app
const port = process.env.PORT || 3000
app.use(express.static('./public')) //the public folder with all your assets (index.html / styles / borwser js etc.)
const server = app.listen(port, () => {
    console.log("Listening on port: " + port);
});
var io = require('socket.io').listen(server)


var test = fs.readFileSync('index.html');



var SerialPort = require('serialport');

const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
    delimiter: '\r\n'
});


var Comport = new SerialPort('COM5', {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

Comport.pipe(parser);


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
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