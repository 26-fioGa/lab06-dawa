const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
io.on('connection', (socket) => {
    socket.emit('welcome', { message: 'Welcome!' });
    socket.on('i am client', function() {
        console.log('received a message from the client.');
    });
});
server.listen(5000, () => {
    console.log('listening on *:5000');
});