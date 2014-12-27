/**
 * Created by Luke on 27/12/2014.
 */

var ErrorBarView = (function (){
    var errorBarView = {};

    var getDocErrorBar = function(){return document.getElementById('error-bar');};

    errorBarView.updateDisplay = function(errorMessage){
        getDocErrorBar().innerHTML = errorMessage;
        getDocErrorBar().style.visibility = 'visible';
    };

    errorBarView.clearDisplay = function(){
      getDocErrorBar().innerHTML = '';
        getDocErrorBar().style.visibility = 'hidden';
    };

    return errorBarView;
}());