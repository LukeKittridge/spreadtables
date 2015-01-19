/**
 * Created by Luke Kittridge on 28/11/2014.
 */

var TableView = (function (){
   var tableView = {};

    tableView.drawTable = function(table){
        var docTable = document.createElement('div');
        docTable.className = "table";
        docTable.id = table.name;
        drawTableTitleBar(table,docTable);
        //ToDo Improve the drawing process
        var left = 0;
        var top = titleBarHeight;
        var columnReset =0;
        var letterCount =0;
        for(var i =-1; i < table.cells.length; i++){
            for(var j =-1; j< table.cells[0].length; j++){
                if(i==-1 || j ==-1) {
                    var __ret = CellView.createAxisCell(left, top, j, i, columnReset, letterCount);
                    var axisCell = __ret.axisCell;
                    left = __ret.left;
                    columnReset = __ret.columnReset;
                    letterCount = __ret.letterCount;
                    docTable.appendChild(axisCell);
                    if(j == (table.cells[0].length -1)){
                        table.maxTableLetters = __ret.axisCell.innerHTML;
                        table.maxTableNumbers = table.cells.length;
                    }
                }
                else{
                   CellView.createDocTableCell(table, i, j, left, top, docTable);
                }

                left +=cellWidth;
            }
            left =0;
            top+=cellHeight;
        }

        document.body.appendChild(docTable);
    };

    tableView.moveTable = function (tableName, top, left){
      var table = document.getElementById(tableName);
        table.style.top = top;
        table.style.left = left;
    };

    function drawTableTitleBar(table,docTable){
        var tableTitleBar = document.createElement('div');
        tableTitleBar.className = 'table-title-bar drag';
        tableTitleBar.style.width = cellWidth * table.cells[0].length + yAxisCellWidth + 2 + 'px'; //+2 accounts for 1px borders
        tableTitleBar.onmousedown = onMouseDown;
        tableTitleBar.onmouseup = onMouseUp;
        var ttbText = document.createElement('div');
        ttbText.className = 'ttb-text';
        ttbText.innerHTML = table.name;
        tableTitleBar.appendChild(ttbText);

        var minimiseButton = document.createElement('div');
        minimiseButton.className = 'table-min-button';
        minimiseButton.innerHTML = "<i class=\'fa fa-minus\'></i>";
        minimiseButton.onclick = function (e){
            e.target.parentNode.parentNode.parentNode.style.visibility = 'hidden';
            var sideElement = document.getElementById(e.target.parentNode.parentNode.parentNode.id + '_sideBarElement');
            sideElement.children[0].style.visibility = 'visible';
        };
        tableTitleBar.appendChild(minimiseButton);
        docTable.appendChild(tableTitleBar);
    }

    return tableView;
}());
