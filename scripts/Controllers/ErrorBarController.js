/**
 * Created by Luke on 27/12/2014.
 */

var ErrorBarController = (function(){
   var errorBarController = {};
    errorBarController.displayErrorMessage = function(e){
        var message = 'Cell ' + CellController.getCurrentCellId() + 'has a ';
        switch(e.type){
            case ErrorEnum.DivideByZero:
                message += "Divide By Zero";
                break;
        }
        message += " error. To fix please update the text shown in red.";
        ErrorBarView.updateDisplay(message);
    };

    errorBarController.clearDisplay = function(){
      ErrorBarView.clearDisplay();
    };
    return errorBarController;
}());