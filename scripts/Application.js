/**
 * Created by Luke Kittridge on 28/11/2014.
 */

var selectedBorder = '1px solid red';
var normalBorder = '1px solid #d9d9d9';

var ApplicationStates = Object.freeze({
    CellSelected : 'CellSelected',
    EditingCell: 'EditingCell',
    Menu: 'Menu',
    FormulaBar: 'FormulaBarView'
});

var Application = (function (){

    var app = {};
    var currentState = ApplicationStates.CellSelected;
    var currentCell;

    document.addEventListener('click', clickHandler,false);
    document.addEventListener('keydown', keyHandler, false);

    app.setCurrentState = function(newState){
        currentState = newState;
   } ;

    app.getCurrentState = function(){
        return currentState;
    };


    function clickHandler(e){
        var element = e.target;

        if(element.id == 'formula-bar'){
            FormulaBarController.handleClick(e);
        }
        else if(element.id.indexOf('sideBarElement') > -1){
            SideBar.handleElementClick(e);
        }

    }

    function keyHandler(event) {

        if(currentState == ApplicationStates.Menu){
            return null;
        }

        if(currentState != ApplicationStates.FormulaBar){
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
                    CellController.selectCellToLeft();
                }
            }

            if((event.keyCode >= 48 && event.keyCode <= 90) || (event.keyCode >= 96 && event.keyCode <= 111) || (event.keyCode >= 186 && event.keyCode <= 222)){
                currentCell.contentEditable = true;
                currentCell.focus();
                console.log("Cell focused");
            }
        }


        if(event.keyCode == 13){ //return
            if(currentState == ApplicationStates.FormulaBar){
                var formulaBar = document.getElementById('formula-bar');
                formulaBar.blur();
                formulaBar.contentEditable = false;
                currentCell.innerHTML = formulaBar.innerHTML;
                currentState = ApplicationStates.CellSelected;
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

    return app;
}());