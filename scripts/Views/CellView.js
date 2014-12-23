/**
 * Created by Luke on 18/12/2014.
 */

var CellView = (function (){
    var cellView = {};

    var currentCellId;

    cellView.getCurrentCellId = function(){
        return currentCellId;
    };

    cellView.getCaretPosition = function(){
        return window.getSelection().baseOffset;
    };

    cellView.moveCaretToEnd = function(){
      moveCaret(window,document.getElementById(currentCellId).innerHTML.length);
    };

    cellView.getCurrentCellText = function(){
        return document.getElementById(currentCellId).innerHTML;
    };

    cellView.editCurrentCell = function(){
        document.getElementById(currentCellId).contentEditable = 'true';
        document.getElementById(currentCellId).focus();
    };

    cellView.deselectCurrentCell = function () {
        var docCell = document.getElementById(currentCellId);
        docCell.contentEditable = false;
        docCell.style.border = normalBorder;
    };

    cellView.selectNewCell = function(newCellId){
        currentCellId = newCellId;
        document.getElementById(currentCellId).style.border = selectedBorder;
    };

    cellView.getCurrentCellFormula = function(){
        return document.getElementById(currentCellId).innerHTML;
    };

    cellView.setCurrentCellText = function(text){
        document.getElementById(currentCellId).innerHTML = text;
    };

    cellView.setCellText = function(cellId, text){
        document.getElementById(cellId).innerHTML = text;
    };

    cellView.focusCurrentCell = function(){
      document.getElementById(currentCellId).focus();
    };

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
        //docCell.onblur = function (e) {
        //    if(applicationState != applicationState.FormulaBar){
        //        update(e.target)
        //    }
        //    applicationState = ApplicationStates.CellSelected;
        //};
        //docCell.onfocus = function (e){
        //    changeCell(e.target);
        //};
        //docCell.onclick = function (e){
        //    if(applicationState == ApplicationStates.EditingCell){
        //        currentCell.innerHTML += e.target.id;
        //    }
        //    else{
        //        changeCell(e.target);
        //    }
        //
        //};
        //docCell.addEventListener("input", function(e){
        //    var formulaBar = document.getElementById('formula-bar');
        //    formulaBar.innerHTML = e.currentTarget.innerHTML;
        //    applicationState = ApplicationStates.EditingCell;
        //});
        docTable.appendChild(docCell);
        return docCell;
    };

    return cellView;
}());