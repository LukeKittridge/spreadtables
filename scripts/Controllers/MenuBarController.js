/**
 * Created by Luke on 19/12/2014.
 */

var MenuBarController = (function(){
    var menuBarController = {};

    MenuBarController.showCreateTableDialogue = function(){
        Application.setCurrentState(ApplicationStates.Menu);
        MenuBarView.showCreateTableDialogue();
        MenuBarView.setTableNameText('table' + (Table.tablesCreated + 1));
    };

    MenuBarController.hideCreateTableDialogue = function(){
        Application.setCurrentState(ApplicationStates.CellSelected);
        MenuBarView.hideCreateTableDialogue();
    };

    MenuBarController.addTableButtonPressed = function (){
        var name =  MenuBarView.getAddTableName();
        var rows = MenuBarView.getAddTableRows();
        var columns = MenuBarView.getAddTableColumns();
        Application.createTable(name,rows,columns);
        Application.setCurrentState(ApplicationStates.CellSelected);
    };



    return menuBarController;
}());
