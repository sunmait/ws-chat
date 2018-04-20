const express = require('express');
const path = require('path');
const httpModule = require('http');

const app = express();
const http = httpModule.Server(app);

app.use(express.static(path.join(__dirname, 'public')));

require('./sockets')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});