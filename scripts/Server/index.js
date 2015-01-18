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

app.use(express.static(path.join(__dirname,'../../public')));

app.use(function (req,res,next) {
   req.db = db;
   next();
});

app.get('/', function(reg,res){
   res.sendFile(path.join(__dirname, '../../public/edit.html'));
});

app.post('/spreadsheet', function (req,res) {
   var name = req.query.name;
   databaseAccess.createSpreadSheet(name,req.db,function(){

   });
   res.end();
});

app.get('/spreadsheets', function(req,res){
   databaseAccess.getSpreadSheets(db, function(spreadsheets){
      res.json(spreadsheets);
   })
});

http.listen(1337, function(){
   console.log('listening on *:1337');
});

