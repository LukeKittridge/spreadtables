/**
 * Created by Luke on 18/12/2014.
 */

var CellController = (function (){

    var cellController = {};


    cellController.changeCurrentCell = function (newCellId){
        if(newCellId != CellView.getCurrentCellId()) {
            if (CellView.getCurrentCellId() != null) {
                CellView.deselectCurrentCell();
            }
            CellView.selectNewCell(newCellId);

            var cell = getGlobalCell(CellView.getCurrentCellId());
            FormulaBarController.updateFormula(cell.formula);
        }
    };

    cellController.handleDoubleClick = function (event){
      if(Application.getCurrentState() == ApplicationStates.CellSelected){
          cellController.changeCurrentCell(event.target.id);
          var cell = getGlobalCell(CellView.getCurrentCellId());
          CellView.setCurrentCellText(cell.formula);
          cellController.editCurrentCell();
      }
    };

    cellController.handleClick = function(event){
        cellController.changeCurrentCell(event.target.id);
    };

    cellController.editCurrentCell = function (){
        Application.setCurrentState(ApplicationStates.EditingCell);
      CellView.editCurrentCell();
    };


    cellController.createAxisCell = function(left, top, j, i, columnReset, letterCount){
        return CellView.createAxisCell(left, top, j, i, columnReset, letterCount);
    };

    cellController.createDocTableCell = function(table, i, j, left, top, docTable){
      return CellView.createDocTableCell(table, i, j, left, top, docTable);
    };

    cellController.updateCurrentCell = function(){
        var cell = getGlobalCell(CellView.getCurrentCellId());
        cell.evaluateNewFormula(CellView.getCurrentCellFormula());
        if(CellView.getCurrentCellFormula()[0] == '='){
            CellView.setCurrentCellText(cell.value);
        }
        else{
            CellView.setCurrentCellText(cell.text);
        }
        updateReferencedCells(cell);
        Application.setCurrentState(ApplicationStates.CellSelected);
        cellController.selectCellBelow();
    };

    cellController.selectCellToLeft = function(){
        var cellParts = splitCellId(CellView.getCurrentCellId());
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
         cellController.changeCurrentCell(cellParts.table + '.' + letters + cellParts.numbers);
    };

    cellController.selectCellToRight = function(){
        var cellParts = splitCellId(CellView.getCurrentCellId());
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

        cellController.changeCurrentCell(cellParts.table + '.' + letters + cellParts.numbers);
    };

    cellController.selectCellBelow = function(){
        var cellParts = splitCellId(CellView.getCurrentCellId());
        var numbers = cellParts.numbers;
        if(numbers < Table.tables[cellParts.table].maxTableNumbers){
            numbers =  parseInt(numbers,10)+1;
        }

        cellController.changeCurrentCell(cellParts.table + '.' + cellParts.letters + numbers);
    };

    cellController.selectCellAbove = function(){
        var cellParts = splitCellId(CellView.getCurrentCellId());
        var numbers = parseInt(cellParts.numbers,10);
        if(numbers > 1){
            numbers--;
        }
        cellController.changeCurrentCell(cellParts.table + '.' + cellParts.letters + numbers);
    };

    function updateReferencedCells(cell){
        for(var cellId in cell.referencedBy){
            var refCell = cell.referencedBy[cellId];
            CellView.setCellText(refCell, refCell.value);
            updateReferencedCells(refCell);
        }
    }

    function splitCellId(cellId){
        var parts = cellId.split('.');
        var cell = parts[1];
        var regGroups = /([a-zA-Z]+)(\d+)/.exec(cell);
        return {table:parts[0],  letters : regGroups[1], numbers : regGroups[2]};
    }

    return cellController;
}());