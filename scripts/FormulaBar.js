/**
 * Created by Luke Kittridge on 28/11/2014.
 */

var FormulaBar = (function (){

    var formulaBar = {};
    var getDocFormulaBar = function(){return document.getElementById('formula-bar'); };

    formulaBar.updateDisplay = function(formula){
      getDocFormulaBar().innerHTML = formula;
    };

    formulaBar.handleClick = function(e){
        Application.setCurrentState(ApplicationStates.EditingCell);
    };

    return formulaBar;

}());