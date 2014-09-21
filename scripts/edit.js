/**
 * Created by Luke Kittridge on 27/07/2014.
 */

function createTable(name, rows, columns) {
    var table = new Table(name, rows, columns);
    Table.tables[table.name] = table;
    drawTable(table);
};

function drawTable(table){
    var docTable = document.createElement('div');
    docTable.id = table.name;
    //ToDo Improve the drawing process
    var left = 0;
    var top = 0;
    for(var i =0; i < table.cells.length; i++){
        for(var j =0; j< table.cells[0].length; j++){
            var docCell = document.createElement('div');
            docCell.className = "cell";
            docCell.id = table.cells[i][j].id;
            docCell.contentEditable = "true";
            docCell.style.left = left + "px";
            docCell.style.top = top + "px";
            docCell.onblur = function(docCell){update(docCell.target)};
            docTable.appendChild(docCell);
            left +=100;
        }
        left =0;
        top+=22;
    }

    document.body.appendChild(docTable);
}

function update(docCell){
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
