/**
 * Created by Luke on 27/12/2014.
 */

var ErrorBarController = (function(){
   var errorBarController = {};
    errorBarController.displayErrorMessage = function(e){
        var cellId;
        if(e.cellId){
            cellId = e.cellId;
        }else{
            cellId = CellController.getCurrentCellId();
        }
        var message = 'Cell ' + cellId + ' has a ';
        switch(e.type){
            case ErrorEnum.DivideByZero:
                message += "Divide By Zero";
                break;
            case ErrorEnum.CircularReference:
                message += "Circular reference";
                break;
            case ErrorEnum.Syntax:
                message += "Syntactical";
                break;
        }
        message += " error. To fix please update the text shown in red.";
        ErrorBarView.updateDisplay(message);
    };

    errorBarController.displayJisonErrorMessage = function(e){
        var message = 'Cell ' + CellController.getCurrentEvaluatedCellId() + ' has an error:';
        message += e.message.split(':')[1];
        var reg = /\n/g;
        message = message.replace(reg,'<br>');
        ErrorBarView.updateDisplay(message);
    };

    errorBarController.clearDisplay = function(){
      ErrorBarView.clearDisplay();
    };
    return errorBarController;
}());