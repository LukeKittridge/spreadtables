/**
 * Created by Luke Kittridge on 23/08/2014.
 */

Table.prototype.cells;
Table.prototype.name;

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
    //TODO Error handling, this will only allow 702 columns
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

}

Table.prototype.getCell = function(cellIdentifier){
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

    return this.cells[row][columnPos];
}

Table.tables = {};