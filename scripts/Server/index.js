/**
 * Created by Luke on 17/01/2015.
 */

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(path.join(__dirname,'../../public')));

app.get('/', function(reg,res){
   res.sendFile(path.join(__dirname, '../../public/edit.html'));
});

app.post('/spreadsheet', function (req,res) {
   var name = req.query.name;
   console.log('create table:' + name);
   res.end();
});

http.listen(1337, function(){
   console.log('listening on *:1337');
});

