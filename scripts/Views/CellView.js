/**
 * Created by Luke on 18/12/2014.
 */

var CellView = (function (){
    var cellView = {};
    var start;
    var end;
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
        return document.getElementById(currentCellId).textContent;
    };

    cellView.setCurrentCellText = function(text){
        document.getElementById(currentCellId).innerHTML = text;
    };

    cellView.setCellText = function(cellId, text){
        document.getElementById(cellId).innerHTML = text;
    };

    cellView.getCellText = function(cellId){
        return document.getElementById(cellId).innerHTML;
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
        docTable.appendChild(docCell);
        return docCell;
    };

    cellView.highlightError = function(e){

            var inHTML = '';
            var text;
            if(e.cellId){
                text = CellController.getCellFormula(e.cellId);
            }else{
                text = CellView.getCurrentCellText();
            }

            start =text.length;
            end = 0;

        if(e.location.token){
            start = e.location.token.start;
            end = e.location.token.end;
        }
        else if(e.location.tokens){
            cellView.extractStartEnd(e.location.tokens);
        }else if(e.location.start){
            start = e.location.start;
            end = e.location.end;
        }


            for(var i =0; i < text.length; i++){
                if(i == start){
                    inHTML += '<span class="cellErrorHighlight">';
                }
                inHTML += text[i];
                if(i == end){
                    inHTML += '</span>';
                }
            if(e.cellId){
                cellView.setCellText(e.cellId,inHTML);
            }else{
                CellView.setCurrentCellText(inHTML);
            }
        }
    };

    cellView.extractStartEnd = function (tokens){

        for(var i =0; i < tokens.length; i++){
          if(tokens[i].tokens){
              cellView.extractStartEnd(tokens[i].tokens);
          }
          else{
              if(tokens[i].token.start < start){
                  start =tokens[i].token.start;
              }
              if(tokens[i].token.end > end){
                  end = tokens[i].token.end;
              }
          }
      }

    };


    return cellView;
}());