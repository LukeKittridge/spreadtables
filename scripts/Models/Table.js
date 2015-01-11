/**
 * Created by Luke Kittridge on 23/08/2014.
 */

Table.prototype.cells;
Table.prototype.name;
Table.prototype.variables;

function Table(name, rows, columns){
    this.name = name;
    this.cells = new Array(rows);
    for(var i = 0; i < rows; i++){
        this.cells[i] = new Array(columns);
    }
    var left = 0;
    var top = 0;
    var cellId;
    var columnReset = 0;
    var letterCount =0;
    var cellLetters;
    this.variables = {};
    //TODO Error handling, this will only allow 702 columns (ZZ)
for(var i =0; i < rows; i++){

    for(var j = 0; j < columns; j++){
        cellLetters = '';
        if(j > 25){
            cellLetters = String.fromCharCode(columnReset + 64);
        }
        cellLetters += String.fromCharCode(letterCount+65);

        cellId = name + '.' + cellLetters + (i+1);
        this.cells[i][j] = new Cell(cellId);
        letterCount++;

        if(letterCount == 26){
            columnReset++;
            letterCount = 0;
        }
    }
    letterCount = 0;
    columnReset = 0;
}
    Table.tablesCreated++;
}

Table.prototype.getCell = function(cellIdentifier){

    var cell;

    if(/^[a-zA-Z]{1,2}[1-9]\d?$/.test(cellIdentifier)) { //If local cell identifier
        var regGroups = /([a-zA-Z]+)(\d+)/.exec(cellIdentifier);
        var columnLetters = regGroups[1].toUpperCase();
        var row = regGroups[2]-1;
        var columnPos = 0;

        if(columnLetters.length == 1){
            columnPos = columnLetters.charCodeAt(0) - 65;
        }
        else{
            columnPos = ((columnLetters.charCodeAt(0) - 64) * 26) + (columnLetters.charCodeAt(1) - 65);
        }

        cell = this.cells[row][columnPos];
    }
    else{ //it's a cell name
        cell = this.variables[cellIdentifier];
    }

    return cell;
};

Table.prototype.addVariable = function(name,cell){
    this.variables[name] = cell;
};

Table.tables = {};
Table.tablesCreated =0;

function getGlobalCell(globalCellIdentifier){
    var cellNames = splitGlobalCells(globalCellIdentifier);
    var cell = Table.tables[cellNames.TableName].getCell(cellNames.Cell);
    return cell;
}

function getCellValue(cellId){
    var cell;
    if(cellId.indexOf('.') != -1){//Global Cell
        cell = getGlobalCell(cellId);
    } else{
        var cellNames = splitGlobalCells(currentEvaluatedCell.id);
        var table = Table.tables[cellNames.TableName];
        cell = table.getCell(cellId);
    }
    return cell.value;
};