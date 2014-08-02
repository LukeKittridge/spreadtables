/**
 * Created by Luke Kittridge on 27/07/2014.
 */

function createTable(rows, columns) {
    var left = 0;
    var top = 0;
    var cellId = 1;
    var table = document.getElementById('table1');
    for (var i = 0; i < rows; i++) {
        for(var j = 0; j < columns; j++){
            var cell = document.createElement('div');
            cell.className = "cell";
            cell.id = cellId;
            cellId++;
            cell.contentEditable = 'true';
            cell.style.left = left + 'px';
            cell.style.top = top + 'px';
            cell.onblur =  function(cell){update(cell.target)}
            table.appendChild(cell);
            left += 100;
        }
        left = 0;
        top += 22;
    }
};

function update(cell){
    var target = document.getElementById('1');
    //TODO replace eval with some sort of language parser
    target.innerHTML =  eval(cell.innerHTML);
};