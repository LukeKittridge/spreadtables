/**
 * Created by Luke Kittridge on 28/11/2014.
 */

var FormulaBar = (function (){

    var formulaBar = {};
    var docFormulaBar = document.getElementById('formula-bar');

    formulaBar.updateDisplay = function(formula){
      docFormulaBar.innerHTML = formula;
    };

    formulaBar.handleClick = function(e){
        Application.setCurrentState(ApplicationStates.EditingCell);
    };

    return formulaBar;

}());