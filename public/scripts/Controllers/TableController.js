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

    tableController.updateCells = function (table, cells, newTable) {
        if(newTable){
            for(var i =0; i < table.rows; i++){
                for(var j =0; j < table.columns; j++){
                    cells[i][j].__proto__ = Cell.prototype;
                    table.cells[i][j] = cells[i][j];
                    CellController.setCellText(cells[i][j].id,cells[i][j].value);
                }
            }
        }
        else{
            for(var cellName in cells){
                var cell = cells[cellName];
                cell.__proto__ = Cell.prototype;
                table.cells[cell.row][cell.column] = cell;
                CellController.setCellText(cell.id, cell.value);
            }
        }
    };

    tableController.updateTablePosition = function (tableName,top,left) {
        var table = Table.tables[tableName];
        table.updatePosition(top,left);
    };

    tableController.moveTable = function(tableName, top, left){
        TableView.moveTable(tableName,top,left);
        tableController.updateTablePosition(tableName,top,left);
    };


    tableController.fillCells = function(selectedCell, startCellId, endCellId){
        fillCells(selectedCell,startCellId,endCellId);
    };

    return tableController;
}());