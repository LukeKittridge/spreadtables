/**
 * Created by Luke Kittridge on 28/11/2014.
 */

var selectedBorder = '1px solid red';
var normalBorder = '1px solid #d9d9d9';


var currentCell;



var ApplicationStates = Object.freeze({
    CellSelected : 'CellSelected',
    EditingCell: 'EditingCell',
    Menu: 'Menu',
    FormulaBar: 'FormulaBar'
});





var Application = (function (){

    var app = {};
    var currentState = ApplicationStates.CellSelected;
    var currentCell;

    document.addEventListener('click', handler,false);

    app.setCurrentState = function(newState){
        currentState = newState;
   } ;

    app.getCurrentState = function(){
        return currentState;
    };

    app.createTable = function (name, rows, columns) {
        var table = new Table(name, rows, columns);
        Table.tables[table.name] = table;
        drawTable(table);
    };

    app.changeCurrentCell = function (newCell){
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
    };

    function handler(e){
        var element = e.targer;

        if(element.id == 'formula-bar'){
            FormulaBar.handleClick(e);
        }
        else if(element.id == ''){
            
        }

    }

    return app;
}());