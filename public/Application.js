/**
 * Created by Luke Kittridge on 28/11/2014.
 */

var selectedBorder = '1px solid red';
var normalBorder = '1px solid #d9d9d9';

var ApplicationStates = Object.freeze({
    CellSelected : 'CellSelected',
    EditingCell: 'EditingCell',
    Menu: 'Menu',
    FormulaBar: 'FormulaBarView',
    CopyingCell: 'CopyingCell'
});

var Application = (function (){

    var app = {};
    var currentState = ApplicationStates.Menu;
    var spreadsheetID;

    document.addEventListener('click', clickHandler,false);
    document.addEventListener('keydown', keyHandler, true);
    document.addEventListener('keyup', keyHandler, false);
    document.addEventListener('dblclick', doubleClickHandler, false);
    document.addEventListener('mouseup', mouseUpHandler,false);
    document.addEventListener('mousedown', mouseDownHandler,false);
    document.addEventListener('mouseover', mouseOverHandler,false);

    app.setCurrentState = function(newState){
        currentState = newState;
        console.log(newState);
   } ;

    app.setSpreadSheetId = function(sheetId){
        SyncController.joinChannel(sheetId);
        spreadsheetID = sheetId;
    };

    app.getSpreadSheetId = function(){
        return spreadsheetID;
    };

    app.getCurrentState = function(){
        return currentState;
    };

    app.start = function(){
      SyncController.getSpreadSheets(function(spreadsheets){
        MenuBarController.showSheetsList(spreadsheets);
      });
    };

    function mouseUpHandler(e){
        CellController.mouseUpHandler(e);
    }

    function mouseDownHandler(e){
        if(e.target.className == 'cell')
            CellController.mouseDownHandler(e);
    }

    function mouseOverHandler(e){
        if(e.target.className == 'cell')
            CellController.mouseOverHandler(e);
    }

    function clickHandler(e){
        var element = e.target;

        if(element.id == 'formula-bar'){
            FormulaBarController.handleClick(e);
        }
        else if(element.id.indexOf('sideBarElement') > -1){
            SideBarController.handleClick(e);
        }
        else if(element.className == 'cell'){
            CellController.handleClick(e.target.id);
        }
        else if(element.className == 'cellErrorHighlight'){
            if(element.parentNode.className == 'cell'){
                CellController.handleClick(e.target.parentNode.id);
            }
        }
        else if(element.className == 'ls-list-element' || element.parentNode.className == 'ls-list-element'){
            MenuBarController.loadSheet(element.id != "" ? element.id : element.parentNode.id);
        }

    }

    function doubleClickHandler(e){
        e.preventDefault();
        CellController.handleDoubleClick(e);
    }

    function keyHandler(event) {

        if(currentState == ApplicationStates.Menu){
            return null;
        }

        if(event.type == 'keydown'){
            if(currentState == ApplicationStates.CellSelected && event.ctrlKey){
                if(event.keyCode == 67){
                    CellController.handleCopy();
                    return false;
                }
            }

            if(currentState == ApplicationStates.CopyingCell && event.ctrlKey){
                if(event.keyCode == 86){
                    CellController.handlePaste();
                    return false;
                }
            }

            if(currentState != ApplicationStates.FormulaBar && currentState != ApplicationStates.EditingCell){
                if(event.keyCode >= 37 && event.keyCode <= 40){ //arrow keys
                    event.preventDefault();

                    if(event.keyCode == 37){ //left arrow
                        CellController.selectCellToLeft();
                    }

                    if(event.keyCode == 38){ //up arrow
                        CellController.selectCellAbove();
                    }

                    if(event.keyCode == 39){ //right arrow
                        CellController.selectCellToRight();
                    }

                    if(event.keyCode == 40){ //down arrow
                        CellController.selectCellBelow();
                    }
                }

                if((event.keyCode >= 48 && event.keyCode <= 90) || (event.keyCode >= 96 && event.keyCode <= 111) || (event.keyCode >= 186 && event.keyCode <= 222)){
                    CellController.editCurrentCell();
                }
            }
            if(event.keyCode == 13){ //return
                event.preventDefault();
                CellController.updateCurrentCell();
            }

            if(event.keyCode == 27){ //Esc
                if(currentState == ApplicationStates.EditingCell || currentState == ApplicationStates.FormulaBar){
                    CellController.escape();
                }
            }

        }

        if(event.type == 'keyup'){
            if(Application.getCurrentState() == ApplicationStates.EditingCell){
                CellController.textChanged();
            }
            else if(Application.getCurrentState() == ApplicationStates.FormulaBar){
                FormulaBarController.textChanged();
            }
        }






    }

    return app;
}());