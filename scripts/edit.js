/**
 * Created by Luke Kittridge on 27/07/2014.
 */

function createTable(name, rows, columns) {
    var table = new Table(name, rows, columns);
    Table.tables[table.name] = table;
    drawTable(table);
};

var selectedBorder = '1px solid red';
var normalBorder = '1px solid black';

function drawTable(table){
    var docTable = document.createElement('div');
    docTable.id = table.name;
    //ToDo Improve the drawing process
    var left = 0;
    var top = 0;
    var columnReset =0;
    var letterCount =0;
    for(var i =-1; i < table.cells.length; i++){
        for(var j =-1; j< table.cells[0].length; j++){
            if(i==-1 || j ==-1) {
                var __ret = createAxisCell(left, top, j, i, columnReset, letterCount);
                var axisCell = __ret.axisCell;
                left = __ret.left;
                columnReset = __ret.columnReset;
                letterCount = __ret.letterCount;
                docTable.appendChild(axisCell);
            }
            else{
                createDocCell(table, i, j, left, top, docTable);
            }

            left +=100;
        }
        left =0;
        top+=22;
    }

    document.body.appendChild(docTable);
}

function update(docCell){
    docCell.style.border = selectedBorder;

    var cell = getGlobalCell(docCell.id);
    cell.evaluateNewFormula(docCell.innerHTML);
    updateReferencedCells(cell);

    docCell.innerHTML = cell.value;
};

function updateReferencedCells(cell){
    for(var cellId in cell.referencedBy){
        var refCell = cell.referencedBy[cellId];
        var docReferencedCell = document.getElementById(refCell.id);
        docReferencedCell.innerHTML = refCell.value;
        updateReferencedCells(refCell);
    }
}

function createAxisCell(left, top, j, i, columnReset, letterCount) {
    var axisCell = document.createElement('div');

    axisCell.style.left = left + 'px';
    axisCell.style.top = top + 'px';

    if (j == -1) {
        axisCell.className = "y-axis";
        axisCell.innerHTML = i + 1;
        left -= 50;
    }
    else {
        var cellLetters = '';
        if (j > 25) {
            cellLetters = String.fromCharCode(columnReset + 64);
        }
        cellLetters += String.fromCharCode(letterCount + 65);
        letterCount++;
        if (letterCount == 26) {
            columnReset++;
            letterCount = 0;
        }
        axisCell.className = "x-axis";
        axisCell.innerHTML = cellLetters;
    }
    return {axisCell: axisCell, left: left, columnReset: columnReset, letterCount: letterCount};
}

function createDocCell(table, i, j, left, top, docTable) {
    var docCell = document.createElement('div');
    docCell.className = "cell";
    docCell.id = table.cells[i][j].id;
    docCell.contentEditable = "true";
    docCell.style.left = left + "px";
    docCell.style.top = top + "px";
    docCell.onkeypress = function (e){
        handleKeyPress(e);
    };
    docCell.onblur = function (e) {
        update(e.target)
    };
    docTable.appendChild(docCell);
    return docCell;
}

function handleKeyPress(event){
    var docCell = event.target;
    if(event.charCode == 13){
        docCell.style.border = normalBorder;
        document.activeElement.blur();
    }


};

function splitCellId(cellId){
    var cell = cellId.split('.')[1];
    var regGroups = /([a-zA-Z]+)(\d+)/.exec(cellIdentifier);
    return {letters : regGroups[0], numbers : regGroups[1]};
}
