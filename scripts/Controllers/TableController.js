/**
 * Created by Luke on 19/12/2014.
 */
var TableController = (function () {
   var tableController = {};

    tableController.createTable = function(name, rows, columns){
        var table = new Table(name, rows, columns);
        Table.tables[table.name] = table;
        TableView.drawTable(table);
        SideBarController.addElement(table.name);
        CellController.changeCurrentCell(name + '.A1');
    };

    return tableController;
}())