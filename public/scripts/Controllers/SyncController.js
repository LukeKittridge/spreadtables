/**
 * Created by Luke on 17/01/2015.
 */

var SyncController = (function (){
   var syncController = {};

    var socket = io();
    var lastPacketDate = new Date();

    syncController.updateSpreadSheet = function(sheet){
      for(var table in sheet){
          if(!Table.tables[table.name]){
              TableController.createTable(table.name, table.rows, table.columns);
              TableController.updateCells(Table.tables[table.name],table.cells,true);
          }
          else{
              TableController.updateCells(Table.tables[table.name],table.cells,false);
          }
      }
    };

    syncController.createNewSpreadSheet = function(name, callback){
        $.ajax({
            type: "POST",
            url: '/spreadsheet?name=' + name,
            success: callback
        });
    };

    syncController.getSpreadSheets = function(callback){
        $.ajax({
            type: "GET",
            url: '/spreadsheets',
            success: callback
        });
    };

    syncController.getSpreadSheet = function(id, callback){
        $.ajax({
            type: "GET",
            url: '/spreadsheet?id=' + id,
            success: callback
        });
    };

    syncController.addTable = function(table){
      socket.emit('add-table', {id:Application.getSpreadSheetId(), table:table });
    };

    syncController.joinChannel = function(spreadsheetId){
        socket.emit('join', spreadsheetId);
    };

    socket.on('add-table', function (table) {
       TableController.createTable(table.name,table.rows,table.columns);
    });

    socket.on('move-table', function(data){
        var sentDate = new Date(data.date);
        if(sentDate > lastPacketDate){
            TableController.moveTable(data.tableName, data.top, data.left);
            lastPacketDate = sentDate;
        }

    });

    syncController.updateTablePosition = function(tableName, top, left){
      socket.emit('move-table', {id:Application.getSpreadSheetId(), tableName : tableName, top : top, left : left, date: new Date() });
    };

    //TODO encode and decode dots in cell reference ids.
    syncController.save = function(tables){
      socket.emit('save', {id:Application.getSpreadSheetId(), tables: tables});
    };

    socket.on('update', function(data){
        for(var tableName in data.tables){
            var table = data.tables[tableName];
            TableController.updateCells(Table.tables[tableName],table.cells,false);
        }
    });

    return syncController;
}());
