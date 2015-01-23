/**
 * Created by Luke on 19/12/2014.
 */

var MenuBarController = (function(){
    var menuBarController = {};

    menuBarController.showCreateTableDialogue = function(){
        Application.setCurrentState(ApplicationStates.Menu);
        MenuBarView.showCreateTableDialogue();
        MenuBarView.setTableNameText('table' + (Table.tablesCreated + 1));
    };

    menuBarController.hideCreateTableDialogue = function(){
        Application.setCurrentState(ApplicationStates.CellSelected);
        MenuBarView.hideCreateTableDialogue();
    };

    menuBarController.hideOpenSheetDialogue = function(){
      Application.setCurrentState(ApplicationStates.CellSelected);
        MenuBarView.hideOpenSheetDialogue();
    };

    menuBarController.addTableButtonPressed = function (){
        var name =  MenuBarView.getAddTableName();
        var rows = MenuBarView.getAddTableRows();
        var columns = MenuBarView.getAddTableColumns();
        TableController.createTable(name,rows,columns);
        Application.setCurrentState(ApplicationStates.CellSelected);
        menuBarController.hideCreateTableDialogue();
        SyncController.addTable(Table.tables[name]);
    };

    menuBarController.createSheetButtonPressed = function(){
      var name = MenuBarView.getCreateSheetName();
       SyncController.createNewSpreadSheet(name,function(sheetId){
           Application.setSpreadSheetId(sheetId);
            MenuBarController.hideOpenSheetDialogue();
       });
    };

    menuBarController.showSheetsList = function(sheets){
        MenuBarView.showSheetsList(sheets);
    };

    menuBarController.loadSheet = function(sheetId){
      SyncController.getSpreadSheet(sheetId, function(sheet){
          for(var tableName in sheet.tables){
              var table = sheet.tables[tableName];
                TableController.createTable(table.name, table.rows, table.columns);
              TableController.updateCells(Table.tables[table.name],table.cells,true);
              TableController.moveTable(table.name,table.top,table.left);
          }
          Application.setSpreadSheetId(sheetId);
          MenuBarController.hideOpenSheetDialogue();
      });
    };


    return menuBarController;
}());
