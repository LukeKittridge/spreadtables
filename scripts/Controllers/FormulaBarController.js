/**
 * Created by Luke on 19/12/2014.
 */

var FormulaBarController = (function (){

    var formulaBarController = {};

    formulaBarController.updateFormula = function(formula){
        FormulaBarView.updateDisplay(formula);
    };

    formulaBarController.handleClick = function(e){
        Application.setCurrentState(ApplicationStates.FormulaBar);
    };

    formulaBarController.executeFormula = function(){

    };

    formulaBarController.textChanged = function(){
      CellController.setCurrentCellText(FormulaBarView.getText());
    };

    formulaBarController.focusFormulaBar = function(){
        FormulaBarView.focusFormulaBar();
    };

    formulaBarController.moveCaretToEnd = function(){
        FormulaBarView.moveCaretToEnd();
    }

    return formulaBarController;
}());