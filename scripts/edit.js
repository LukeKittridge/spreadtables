/**
 * Created by Luke Kittridge on 27/07/2014.
 */

function createTable(name, rows, columns) {
    var table = new Table(name, rows, columns);
    Table.tables[table.name] = table;
    drawTable(table);
};

var selectedBorder = '1px solid red';
var normalBorder = '1px solid #d9d9d9';
var currentCell;

window.onkeydown = handleKeyDown;

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
}

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
    docCell.onblur = function (e) {
        update(e.target)
    };
    docCell.onfocus = function (e){
        currentCell = e.target;
    }
    docTable.appendChild(docCell);
    return docCell;
}

function handleKeyDown(event){
    if(event.keyCode == 13){ //return
        currentCell.style.border = normalBorder;
        document.activeElement.blur();
    }

    if(event.keyCode == 37){ //left arrow
        currentCell.style.border = normalBorder;
        var leftCellId = getCellIdToLeft(currentCell.id);
        var leftCell = document.getElementById(leftCellId);
        leftCell.style.border = selectedBorder;
        currentCell = leftCell;
    }

}

function getCellIdToLeft(cellId){
    var cellParts = splitCellId(cellId);
    var letters = cellParts.letters;

    if(letters.length==1){
        if(letters.charCodeAt(0) > 65){
            letters = String.fromCharCode(letters.charCodeAt(0)-1);
        }
    }
    else if (letters.charCodeAt(1) > 65) {
        letters = letters.replaceCharAt(1, String.fromCharCode(letters.charCodeAt(1) - 1));
    }
    else if (letters.charCodeAt(0) > 65) {
        letters = String.fromCharCode(letters.charCodeAt(0) - 1) + 'Z';
    } else {
        letters = 'Z';
    }
    return cellParts.table + '.' + letters + cellParts.numbers;
}

function splitCellId(cellId){
    var parts = cellId.split('.');
    var cell = parts[1];
    var regGroups = /([a-zA-Z]+)(\d+)/.exec(cell);
    return {table:parts[0],  letters : regGroups[1], numbers : regGroups[2]};
}
