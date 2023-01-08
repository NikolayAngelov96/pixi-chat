const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();

const server = http.createServer(app);

const io = new socketIO.Server(server, {
    cors: {
        origin: "http://localhost:8080"
    }
});

const rooms = {};


io.on('connect', (socket) => {
    console.log('user connected');

    socket.on('selectRoom', ({ username, roomId }) => {
        if (rooms[roomId] == undefined) {
            rooms[roomId] = new Map();
        }

        console.log(username, roomId);
        socket.join(roomId);

        socket.on('message', (message) => {
            io.to(roomId).emit('message', { username, message })
        })
    })

});


server.listen(3000, () => console.log('server listening on port 3000'));