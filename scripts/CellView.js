/**
 * Created by Luke on 18/12/2014.
 */

var CellView = (function (){
    var cellView = {};

    cellView.createAxisCell = function(left, top, j, i, columnReset, letterCount){
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
    };

    cellView.createDocTableCell = function(table, i, j, left, top, docTable){
        var docCell = document.createElement('div');
        docCell.className = "cell";
        docCell.id = table.cells[i][j].id;
        docCell.contentEditable = "false";
        docCell.style.left = left + "px";
        docCell.style.top = top + "px";
        docCell.onblur = function (e) {
            if(applicationState != applicationState.FormulaBar){
                update(e.target)
            }
            applicationState = ApplicationStates.CellSelected;
        };
        docCell.onfocus = function (e){
            changeCell(e.target);
        };
        docCell.onclick = function (e){
            if(applicationState == ApplicationStates.EditingCell){
                currentCell.innerHTML += e.target.id;
            }
            else{
                changeCell(e.target);
            }

        };
        docCell.addEventListener("input", function(e){
            var formulaBar = document.getElementById('formula-bar');
            formulaBar.innerHTML = e.currentTarget.innerHTML;
            applicationState = ApplicationStates.EditingCell;
        });
        docTable.appendChild(docCell);
        return docCell;
    };

    cellView.updateCell = function(docCell){
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

    };

    function updateReferencedCells(cell){
        for(var cellId in cell.referencedBy){
            var refCell = cell.referencedBy[cellId];
            var docReferencedCell = document.getElementById(refCell.id);
            docReferencedCell.innerHTML = refCell.value;
            updateReferencedCells(refCell);
        }
    }

    function splitCellId(cellId){
        var parts = cellId.split('.');
        var cell = parts[1];
        var regGroups = /([a-zA-Z]+)(\d+)/.exec(cell);
        return {table:parts[0],  letters : regGroups[1], numbers : regGroups[2]};
    }

    return cellView;
}());