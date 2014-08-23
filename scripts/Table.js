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
        var cell = new Cell(cellId);
        this.cells[i][j] = cell;
        letterCount++;

        if(letterCount == 26){
            columnReset++;
            letterCount = 0;
        }
    }
    letterCount = 0;
    columnReset = 0;
}

};

Table.tables = {};