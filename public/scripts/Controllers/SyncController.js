/**
 * Created by Luke on 17/01/2015.
 */

var SyncController = (function (){
   var syncController = {};

    var socket = io();

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

    return syncController;
}());
