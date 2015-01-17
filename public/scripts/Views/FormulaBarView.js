/**
 * Created by Luke Kittridge on 28/11/2014.
 */

var FormulaBarView = (function (){

    var formulaBar = {};
    var getDocFormulaBar = function(){return document.getElementById('formula-bar'); };

    formulaBar.updateDisplay = function(formula){
      getDocFormulaBar().innerHTML = formula;
    };

    formulaBar.getText = function(){
        return getDocFormulaBar().innerHTML;
    };

    formulaBar.focusFormulaBar = function(){
      getDocFormulaBar().focus();
    };

    formulaBar.moveCaretToEnd = function(){
        moveCaret(window,getDocFormulaBar().innerHTML.length);
    };

    return formulaBar;

}());