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

var ApplicationStates = Object.freeze({
    CellSelected : 'CellSelected',
    CellEntry: 'CellEntry',
    Menu: 'Menu',
    FormularBar: 'FormulaBar'
});

var applicationState = ApplicationStates.CellSelected;

function formulaBarSelected(){
    applicationState = ApplicationStates.FormularBar;
}

function changeCell(newCell){
    if(newCell != currentCell) {
        if (currentCell != null) {
            currentCell.blur();
            currentCell.style.border = normalBorder;

        }
        newCell.style.border = selectedBorder;
        currentCell = newCell;

        var cell = getGlobalCell(currentCell.id);
        var formularBar = document.getElementById('formula-bar');
        formularBar.innerHTML = cell.formula;
    }
}

function drawTable(table){
    var docTable = document.createElement('div');
    docTable.className = "drag";
    docTable.id = table.name;
    createTableTitleBar(table,docTable);
    //ToDo Improve the drawing process
    var left = 0;
    var top = titleBarHeight;
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
                if(j == (table.cells[0].length -1)){
                    table.maxTableLetters = __ret.axisCell.innerHTML;
                    table.maxTableNumbers = table.cells.length;
                }
            }
            else{
                createDocCell(table, i, j, left, top, docTable);
            }

            left +=cellWidth;
        }
        left =0;
        top+=cellHeight;
    }

    document.body.appendChild(docTable);
    changeCell(document.getElementById(table.name + '.A1'));
}

function createTableTitleBar(table,docTable){
    var tableTitleBar = document.createElement('div');
    tableTitleBar.className = 'table-title-bar';
    tableTitleBar.style.width = cellWidth * table.cells[0].length + yAxisCellWidth + 2 + 'px'; //+2 accounts for 1px borders
    var ttbText = document.createElement('div');
    ttbText.className = 'ttb-text';
    ttbText.innerHTML = table.name;
    tableTitleBar.appendChild(ttbText);
    var sideBarElement = document.createElement('div');
    sideBarElement.className = "side-bar-element";
    sideBarElement.id = docTable.id + '_sideBarElement';
    var sideBar = document.getElementById('table-side-bar');
    sideBar.appendChild(sideBarElement);
    sideBarElement.innerHTML = docTable.id;
    var elementPlus = document.createElement('div');
    elementPlus.className = 'side-bar-element-plus';
    elementPlus.innerHTML = "<i class=\'fa fa-plus\'></i>";
    elementPlus.id = docTable.id + '_element-plus';
    sideBarElement.appendChild(elementPlus);
    sideBarElement.onclick = function (e) {
        var tableId = e.target.id.split('_')[0] == '' ? e.target.parentNode.parentNode.id.split('_')[0] : e.target.id.split('_')[0];
        var table = document.getElementById(tableId);
        var elementPlus = document.getElementById(tableId+'_element-plus');
        elementPlus.style.visibility = 'hidden';
        table.style.visibility = 'visible';
    }
    var minimiseButton = document.createElement('div');
    minimiseButton.className = 'table-min-button';
    minimiseButton.innerHTML = "<i class=\'fa fa-minus\'></i>";
    minimiseButton.onclick = function (e){
        e.target.parentNode.parentNode.parentNode.style.visibility = 'hidden';
        var sideElement = document.getElementById(e.target.parentNode.parentNode.parentNode.id + '_sideBarElement');
        sideElement.children[0].style.visibility = 'visible';
    }
    tableTitleBar.appendChild(minimiseButton);
    docTable.appendChild(tableTitleBar);
}

function update(docCell){
    docCell.style.border = selectedBorder;

    var cell = getGlobalCell(docCell.id);
        cell.evaluateNewFormula(docCell.innerHTML);
    if(docCell.innerHTML[0] == '='){
        docCell.innerHTML = cell.value;
    }
    else{
        docCell.innerHTML = cell.text;
    }
    updateReferencedCells(cell);


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
    docCell.contentEditable = "false";
    docCell.style.left = left + "px";
    docCell.style.top = top + "px";
    docCell.onblur = function (e) {
        update(e.target)
    };
    docCell.onfocus = function (e){
        changeCell(e.target);
    };
    docCell.onclick = function (e){
        changeCell(e.target);
    };
    docTable.appendChild(docCell);
    return docCell;
}

function handleKeyDown(event){

    if(applicationState == ApplicationStates.Menu){
        return null;
    }

    if(applicationState != ApplicationStates.FormularBar){
        if(event.keyCode >= 37 && event.keyCode <= 40){ //arrow keys
            event.preventDefault();

            if(event.keyCode == 37){ //left arrow
                var leftCellId = getCellIdToLeft(currentCell.id);
                var leftCell = document.getElementById(leftCellId);
                changeCell(leftCell);
            }

            if(event.keyCode == 38){ //up arrow
                var aboveCellId = getCellIdAbove(currentCell.id);
                var aboveCell = document.getElementById(aboveCellId);
                changeCell(aboveCell);
            }

            if(event.keyCode == 39){ //right arrow
                var rightCellId = getCellIdToRight(currentCell.id);
                var rightCell = document.getElementById(rightCellId);
                changeCell(rightCell);
            }

            if(event.keyCode == 40){ //down arrow
                var belowCellId = getCellIdBelow(currentCell.id);
                var belowCell = document.getElementById(belowCellId);
                changeCell(belowCell);
            }
        }

        if((event.keyCode >= 48 && event.keyCode <= 90) || (event.keyCode >= 96 && event.keyCode <= 111) || (event.keyCode >= 186 && event.keyCode <= 222)){
            currentCell.contentEditable = true;
            currentCell.focus();
            console.log("Cell focused");
        }
    }


    if(event.keyCode == 13){ //return
        if(applicationState == ApplicationStates.FormularBar){
            var formulaBar = document.getElementById('formula-bar');
            formulaBar.blur();
            formulaBar.contentEditable = false;
            currentCell.innerHTML = formulaBar.innerHTML;
            applicationState = ApplicationStates.CellSelected;
            update(currentCell);
            formulaBar.contentEditable = true;
        }
        document.activeElement.blur();
        var belowCellId = getCellIdBelow(currentCell.id);
        belowCell = document.getElementById(belowCellId);
        currentCell.style.border = normalBorder;
        currentCell.contentEditable = false;
        belowCell.style.border = selectedBorder;
        changeCell(belowCell);
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

function getCellIdToRight(cellId){
    var cellParts = splitCellId(cellId);
    var letters = cellParts.letters;
    var table = Table.tables[cellParts.table];
    if(table.maxTableLetters != letters){
        if(letters.length ==1){
            if(letters.charCodeAt(0) < 90){
                letters = String.fromCharCode(letters.charCodeAt(0)+1);
            }
            else{
                letters = 'AA';
            }

        }
        else{
            if(letters.charCodeAt(1) < 90){
                letters = letters.replaceCharAt(1, String.fromCharCode(letters.charCodeAt(1)+1));
            }
            else if(letters.charCodeAt(0) <90){
                letters = String.fromCharCode((letters.charCodeAt(0)+1)) + 'A';
            }
        }
    }

    return cellParts.table + '.' + letters + cellParts.numbers;
}

function getCellIdBelow(cellId){

    var cellParts = splitCellId(cellId);
    var numbers = cellParts.numbers;
    if(numbers < Table.tables[cellParts.table].maxTableNumbers){
        numbers =  parseInt(numbers,10)+1;
    }

    return cellParts.table + '.' + cellParts.letters + numbers;
}

function getCellIdAbove(cellId){
    var cellParts = splitCellId(cellId);
    var numbers = parseInt(cellParts.numbers,10);
    if(numbers > 1){
        numbers--;
    }
    return cellParts.table + '.' + cellParts.letters + numbers;
}

function splitCellId(cellId){
    var parts = cellId.split('.');
    var cell = parts[1];
    var regGroups = /([a-zA-Z]+)(\d+)/.exec(cell);
    return {table:parts[0],  letters : regGroups[1], numbers : regGroups[2]};
}

