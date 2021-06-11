//#region require
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const path = require('path');
const fs = require('fs');
const PORT = 3001;

const io = require('socket.io')(http, {
	cors: {
		origins: ['http://localhost:' + PORT]
	}
});

//var io = require('socket.io').listen(3000);
var MessageCounter = 0;
io.on('connection', function (client) {
    console.log('connected:', client.client.id);
    client.on('serverEvent', function (data) {
        console.log('new message from client:', data);
    });
		client.on('analle',d=>{
			io.emit('analle',{data:'new message from '+client.id});
			console.log(`#${MessageCounter}: weitergeleitet!`);

		});
    // setInterval(function () {
    //     client.emit('clientEvent', Math.random());
    //     console.log('message sent to the clients');
    // }, 3000);
});
console.log('WAS?')
http.listen(process.env.PORT || PORT, () => { console.log('listening on port ' + PORT); });
