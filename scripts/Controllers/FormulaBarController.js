/**
 * Created by Luke on 19/12/2014.
 */

var FormulaBarController = (function (){

    var formulaBarController = {};

    formulaBarController.updateFormula = function(formula){
        FormulaBarView.updateDisplay(formula);
    };

    formulaBarController.handleClick = function(e){
        Application.setCurrentState(ApplicationStates.EditingCell);
    };

    formulaBarController.executeFormula = function(){
        
    };

    return formulaBarController;
}());