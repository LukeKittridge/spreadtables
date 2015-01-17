/**
 * Created by Luke on 17/01/2015.
 */

var SyncController = (function(){
   var syncController = {};

    syncController.updateSpreadSheet = function(sheet){
      for(var table in sheet){
          if(!Table.tables[table.name]){
              TableController.createTable(table.name, table.rows, table.columns);
          }
      }
    };

    return syncController;
});
