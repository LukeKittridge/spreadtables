/**
 * Created by Luke on 17/01/2015.
 */

var SyncController = (function (){
   var syncController = {};

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

    syncController.createNewSpreadSheet = function(name){
        $.ajax({
            type: "POST",
            url: '/spreadsheet?name=' + name
        });
    };

    syncController.getSpreadSheets = function(callback){
        $.ajax({
            type: "GET",
            url: '/spreadsheets',
            success: callback
        });
    };

    return syncController;
}());
