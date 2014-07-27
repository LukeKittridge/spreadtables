/**
 * Created by Luke Kittridge on 27/07/2014.
 */

function setUpGrid (){
    var table1 = document.getElementById('table1');
    for(var i =0; i < 10; i++){
       for(var j =0; j < 10; j++){
           var cell = document.createElement('div');
           cell.className = "cell";
           cell.contentEditable = 'true';
           table1.appendChild(cell);
       }
    }
};