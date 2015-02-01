/**
 * Created by Luke on 18/12/2014.
 */

var CellView = (function (){
    var cellView = {};
    var start;
    var end;
    var currentCellId;
    var startCellId;
    var endCellId;
    var mouseDown = false;
    var cssCellHighLight = 'rgba(160, 195, 255,0.4)';
    var cssCellBackGroundColor = 'white';
    var cellsHighLighted = [];

    cellView.getCurrentCellId = function(){
        return currentCellId;
    };

    cellView.getStartCellId = function () {
        return startCellId;
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
        docCell.style.zIndex = 0;
    };

    cellView.selectNewCell = function(newCellId){
        cellView.removeHighLight();
        currentCellId = newCellId;
        var docCell =  document.getElementById(currentCellId)
        docCell.style.border = selectedBorder;
        docCell.style.zIndex = 10;

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

    cellView.onMouseDown = function(e){
        if(e.target.className == 'cell'){
            startCellId = e.target.id;
            mouseDown = true;
        }
    };

    cellView.onMouseUp = function(e){
        if(e.target.className == 'cell' && mouseDown)
            endCellId = e.target.id;
        mouseDown = false;
    };

    cellView.onMouseOver = function(e){
      if(mouseDown && tablesMatch(startCellId,e.target.id)){
          cellView.removeHighLight();
          var cellsToHighLight = CellController.cellsToHighlight(startCellId,e.target.id);
          for(var i =0; i < cellsToHighLight.length; i++){
              var cell = document.getElementById(cellsToHighLight[i]);
              cell.style.backgroundColor = cssCellHighLight;
          }
          cellsHighLighted = cellsToHighLight;
      }
    };

    cellView.removeHighLight = function () {
        for(var i =0; i < cellsHighLighted.length; i++){
            var cell = document.getElementById(cellsHighLighted[i]);
            cell.style.background = cssCellBackGroundColor;
        }
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

    cellView.highlighJisonError = function(e){
        var parts = e.message.split('\n');
        var errorPos = parts[2].length-1;
        var newFormula ='';
        for(var i=0; i < parts[1].length; i++){
            if(i == errorPos){
                newFormula += '<span class="cellErrorHighlight">' + parts[1][errorPos] + '</span>';
            }else{
                newFormula += parts[1][i];
            }
        }
        var newMessage='';
        for(var i=0; i< parts.length; i++){
            if(i == 1){
                newMessage += newFormula + '\n';
            }
            else{
                newMessage += parts[i] + '\n';
            }
        }

        CellView.setCurrentCellText(newFormula);
        e.message = newMessage;
        return e;
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


    function tablesMatch(cellIdA,cellIdB){
        var tableA = cellIdA.split('.')[0];
        var tableB = cellIdB.split('.')[0];
        return tableA == tableB;
    }

    return cellView;
}());