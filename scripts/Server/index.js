/**
 * Created by Luke on 17/01/2015.
 */

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var monk = require('monk');
var db = monk('localhost:27017/spreadtables');
var databaseAccess = require('./DataBaseAccess');
var ObjectID = require('mongodb').ObjectID;

app.use(express.static(path.join(__dirname,'../../public')));

app.use(function (req,res,next) {
   next();
});

app.get('/', function(reg,res){
   res.sendFile(path.join(__dirname, '../../public/edit.html'));
});

app.post('/spreadsheet', function (req,res) {
   var name = req.query.name;
   databaseAccess.createSpreadSheet(name,db,function(sheetId){
      res.send(sheetId);
   });
   res.end();
});

app.get('/spreadsheet', function(req,res){
   var id = req.query.id;
   databaseAccess.getSpreadSheet(new ObjectID(id),db,function(spreadsheet){
      res.json(spreadsheet);
   });
});

app.get('/spreadsheets', function(req,res){
   databaseAccess.getSpreadSheets(db, function(spreadsheets){
      res.json(spreadsheets);
   })
});

io.on('connection', function(socket){
   console.log('A user has connected');

   socket.on('join',function(sheetId){
      socket.join(sheetId);
   });

   socket.on('add-table', function(res){
      console.log('adding table');
      var id = res.id;
      var table = res.table;
      databaseAccess.addTable(new ObjectID(id),table,db,function(){
         socket.broadcast.to(id).emit('add-table', table);
      });

   });

   socket.on('disconnect',function(){
      console.log('user disconnected');
   })

});

http.listen(1337, function(){
   console.log('listening on *:1337');
});

