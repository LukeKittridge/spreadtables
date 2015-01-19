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
                    table.cells[i][j] = cells[i][j];
                    CellController.setCellText(cells[i][j].id,cells[i][j].text);
                }
            }
        }
        else{
            for(var cell in cells){
                table.cells[cell.row][cell.column] = cell;
                CellController.setCellText(cell.text, cell.id);
            }
        }
    };

    return tableController;
}());