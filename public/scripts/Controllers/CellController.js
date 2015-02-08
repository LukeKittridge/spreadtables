/**
 * Created by Luke on 18/12/2014.
 */

var CellController = (function (){

    var cellController = {};

    var tablesToSync = {}; //Holds tables containing cells to be synced

    cellController.mouseUpHandler  = function(e){
        CellView.onMouseUp(e);
    };

    cellController.mouseDownHandler = function(e){
        CellView.onMouseDown(e);
    };

    cellController.mouseOverHandler = function(e){
      CellView.onMouseOver(e);
    };

    cellController.handleCopy = function(){
      Application.setCurrentState(ApplicationStates.CopyingCell);
        CellView.setCurrentCellToCopy();
    };

    cellController.handlePaste = function () {
      Application.setCurrentState(ApplicationStates.CellSelected);
        TableController.fillCells(getGlobalCell(CellView.getCurrentCellId()),CellView.getStartCellId(),CellView.getEndCellId());
        CellView.updateSelectedCells();
        CellView.removeHighLight();
        CellView.selectNewCell(CellView.getCurrentCellId());
    };

    cellController.changeCurrentCell = function (newCellId){
        if(newCellId != CellView.getCurrentCellId()) {
            if (CellView.getCurrentCellId() != null) {
                CellView.deselectCurrentCell();
            }
            CellView.selectNewCell(newCellId);

            var cell = getGlobalCell(CellView.getCurrentCellId());
            if(cell.getHasError()){
                FormulaBarController.updateFormula(CellView.getCurrentCellText());
            }else{
                FormulaBarController.updateFormula(cell.formula);
            }

        }
    };

    cellController.setCurrentCellText = function(text){
      CellView.setCurrentCellText(text);
    };

    cellController.getCurrentCellId = function(){
        return CellView.getCurrentCellId();
    };

    cellController.setCellText = function(cellId, text){
      CellView.setCellText(cellId,text);
    };

    cellController.handleDoubleClick = function (event){
        var eventId;
        if(event.target.className == 'cellErrorHighlight'){
            eventId = event.target.parentNode.id;
        }else{
            eventId = event.target.id;
        }
      if(Application.getCurrentState() == ApplicationStates.CellSelected){
          cellController.changeCurrentCell(eventId);
          var cell = getGlobalCell(CellView.getCurrentCellId());
          CellView.setCurrentCellText(cell.formula);
          cellController.editCurrentCell();
      }
    };

    cellController.handleClick = function(targetId){
        if(Application.getCurrentState() == ApplicationStates.EditingCell || Application.getCurrentState() == ApplicationStates.FormulaBar){
            if(CellView.getCurrentCellId() != targetId){
                CellView.setCurrentCellText(CellView.getCurrentCellText() + targetId);
                cellController.textChanged();
                if(Application.getCurrentState() == ApplicationStates.EditingCell){
                    CellView.focusCurrentCell();
                    CellView.moveCaretToEnd();
                }else{
                    FormulaBarController.focusFormulaBar();
                    FormulaBarController.moveCaretToEnd();
                }

            }
        }
        else if (Application.getCurrentState() == ApplicationStates.CellSelected){
            cellController.changeCurrentCell(targetId);
        }
    };

    cellController.editCurrentCell = function (){
        Application.setCurrentState(ApplicationStates.EditingCell);

      CellView.editCurrentCell();
    };

    cellController.textChanged = function (){
        if(Application.getCurrentState() == ApplicationStates.EditingCell || Application.getCurrentState() == ApplicationStates.FormulaBar){
            FormulaBarController.updateFormula(CellView.getCurrentCellText());
        }
    };


    cellController.createAxisCell = function(left, top, j, i, columnReset, letterCount){
        return CellView.createAxisCell(left, top, j, i, columnReset, letterCount);
    };

    cellController.createDocTableCell = function(table, i, j, left, top, docTable){
      return CellView.createDocTableCell(table, i, j, left, top, docTable);
    };

    cellController.updateCurrentCell = function(){
        tablesToSync = {};
        var cell = getGlobalCell(CellView.getCurrentCellId());
        var error = false;
        var switchToCell = false; //Will store the cell ID to switch to, in case of an error
        try{
            cell.evaluateNewFormula(CellView.getCurrentCellFormula());
        }catch(e){
            if(e.type == ErrorEnum.CircularReference){
               e = cellController.handleCircularReferenceError(e);
            }else if(e.type == ErrorEnum.DivideByZero && UseJison){
                e = jisonDivideByZero();
            }
            if(e.cellId){
                cell = getGlobalCell(e.cellId);
                switchToCell = e.cellId;
            }

            error = true;
            cell.setHasError(true);
            if(!e.type){ //Jison Error
                var newErrorMessage = CellView.highlightJisonError(e);
                ErrorBarController.displayJisonErrorMessage(newErrorMessage);
            }else{
                CellView.highlightError(e);
                ErrorBarController.displayErrorMessage(e);
            }

        }
        if(!error){
            cell.setHasError(false);
            ErrorBarController.clearDisplay();
            if(CellView.getCurrentCellFormula()[0] == '='){
                CellView.setCurrentCellText(cell.value);
            }
            else{
                CellView.setCurrentCellText(cell.text);
            }
            //update referenced cells and record cells ready to be synced
            updateReferencedByCells(cell);
            saveReferencedCells(cell);
        }

        Application.setCurrentState(ApplicationStates.CellSelected);
        if(switchToCell){
            cellController.changeCurrentCell(switchToCell);
        }else{
            cellController.selectCellBelow();
        }
        //sync tables and cells
        SyncController.save(tablesToSync);
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

    cellController.displayErrorMessage = function(e){

    };

    cellController.getCellFormula = function(cellId){
      return getGlobalCell(cellId).formula;
    };

    cellController.getCellValue = function(cellId){
      return getGlobalCell(cellId).value;
    };

    cellController.handleCircularReferenceError = function(e){
        var cellArray = new Array();
        var cellId = findCircularReference(e.cell, e.cell, cellArray)[0];
        var text = CellView.getCurrentCellText();
        var start = text.indexOf(cellId);
        var end = start + cellId.length-1;
        e.location = {};e.location.token={};
        e.location.token.start = start;
        e.location.token.end = end;
        return e;
    };

    cellController.getCurrentEvaluatedCellId = function(){
        return currentEvaluatedCell.id;
    };

    cellController.cellsToHighlight = function (startId,endId) {
        var area = cellIdDifference(startId,endId);
        var yCount = Math.abs(area.y);
        var xCount = Math.abs(area.x);
        var yNeg = area.y < 0;
        var xNeg = area.x < 0;
        var cellsToHighLight = [];
        for(var i = 0; i <= yCount; i++) { //row
            for (var j = 0; j <= xCount; j++) { //column
                var newY = yNeg ? i*-1 : i;
                var newX = xNeg ? j*-1 : j;
                var newCellId = cellIdPlusVector(startId,new Vector(newX,newY));
                cellsToHighLight.push(newCellId);
            }
        }
        return cellsToHighLight;
    };

    cellController.escape = function(){
        var cell = getGlobalCell(CellView.getCurrentCellId());
        if(cell.formula)
            CellView.escape(cell.value);
        else
            CellView.escape(cell.text);
        Application.setCurrentState(ApplicationStates.CellSelected);
    };

    function updateReferencedByCells(cell){
        addCellToSyncList(cell);
        for(var cellId in cell.referencedBy){
            var refCell = getGlobalCell(cellId);
            CellView.setCellText(refCell.id, refCell.value);
            updateReferencedByCells(refCell);
        }
    }

    function saveReferencedCells(cell){
        for(var cellId in cell.references){
            var refCell = getGlobalCell(cellId);
            addCellToSyncList(refCell);
        }
    }

    function addCellToSyncList(cell){
        if(!tablesToSync[cell.tableName]){
            tablesToSync[cell.tableName] = {name : cell.tableName, cells : {}}
        }
        tablesToSync[cell.tableName].cells[cell.id] = cell;
    }



    function jisonDivideByZero(){
        UseJison = false;
        try{
            var cell = getGlobalCell(CellView.getCurrentCellId());
            cell.evaluateNewFormula(CellView.getCurrentCellFormula());
            cellController.updateCurrentCell();
        }catch (e){
            UseJison = true;
            return e;
        }
    }

    return cellController;
}());