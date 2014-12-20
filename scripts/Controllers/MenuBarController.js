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

    menuBarController.addTableButtonPressed = function (){
        var name =  MenuBarView.getAddTableName();
        var rows = MenuBarView.getAddTableRows();
        var columns = MenuBarView.getAddTableColumns();
        TableController.createTable(name,rows,columns);
        Application.setCurrentState(ApplicationStates.CellSelected);
        menuBarController.hideCreateTableDialogue();
    };



    return menuBarController;
}());
