/**
 * Created by Luke Kittridge on 27/07/2014.
 */

function setUpGrid() {
    var table1 = document.getElementById('table1');
    for (var i = 0; i < 10; i++) {
        var cell = document.createElement('div');
        cell.className = "cell";
        cell.id = i;
        cell.contentEditable = 'true';
        cell.onblur =  function(cell){update(cell.target)}
        table1.appendChild(cell);
    }
};

function update(cell){
    var target = document.getElementById('4');
    //TODO replace eval with some sort of language parser
    target.innerHTML =  eval(cell.innerHTML);
};