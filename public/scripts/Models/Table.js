/**
 * Created by Luke Kittridge on 23/08/2014.
 */

Table.prototype.cells;
Table.prototype.name;
Table.prototype.variables;

function Table(name, rows, columns){
    this.name = name;
    this.cells = new Array(rows);
    for(var i = 0; i < rows; i++){
        this.cells[i] = new Array(columns);
    }
    this.rows = rows;
    this.columns = columns;
    this.left = 100;
    this.top = 100;
    var cellId;
    var columnReset = 0;
    var letterCount =0;
    var cellLetters;
    this.variables = {};
    //TODO Error handling, this will only allow 702 columns (ZZ)
for(var i =0; i < rows; i++){

    for(var j = 0; j < columns; j++){
        cellLetters = '';
        if(j > 25){
            cellLetters = String.fromCharCode(columnReset + 64);
        }
        cellLetters += String.fromCharCode(letterCount+65);

        cellId = name + '.' + cellLetters + (i+1);
        this.cells[i][j] = new Cell(cellId,i,j,name);
        letterCount++;

        if(letterCount == 26){
            columnReset++;
            letterCount = 0;
        }
    }
    letterCount = 0;
    columnReset = 0;
}
    Table.tablesCreated++;
}

Table.prototype.getCell = function(cellIdentifier){

    var cell;

    if(/^[a-zA-Z]{1,2}[1-9]\d?$/.test(cellIdentifier)) { //If local cell identifier
        var regGroups = /([a-zA-Z]+)(\d+)/.exec(cellIdentifier);
        var columnLetters = regGroups[1].toUpperCase();
        var row = regGroups[2]-1;
        var columnPos = 0;

        if(columnLetters.length == 1){
            columnPos = columnLetters.charCodeAt(0) - 65;
        }
        else{
            columnPos = ((columnLetters.charCodeAt(0) - 64) * 26) + (columnLetters.charCodeAt(1) - 65);
        }

        cell = this.cells[row][columnPos];
    }
    else{ //it's a cell name
        cell = this.variables[cellIdentifier];
    }

    return cell;
};

Table.prototype.updatePosition = function(top,left){
    this.top = top;
    this.left = left;
};

Table.prototype.addVariable = function(name,cell){
    this.variables[name] = cell;
};

Table.tables = {};
Table.tablesCreated =0;

function getGlobalCell(globalCellIdentifier){
    var cellNames = splitGlobalCells(globalCellIdentifier);
    var cell = Table.tables[cellNames.TableName].getCell(cellNames.Cell);
    return cell;
}

function getCellValue(cellId){
    var cell;
    if(cellId.indexOf('.') != -1){//Global Cell
        cell = getGlobalCell(cellId);
    } else{
        var cellNames = splitGlobalCells(currentEvaluatedCell.id);
        var table = Table.tables[cellNames.TableName];
        cell = table.getCell(cellId);
    }
    if(cell.value == ""){
        cell.value = 0;
    }
    return cell.value;
};

function fillCells(selectedCell,startId, endId){
    var area = cellIdDifference(startId,endId);
    var yNeg = area.y < 0;
    var xNeg = area.x < 0;
    var yCount = Math.abs(area.y);
    var xCount = Math.abs(area.x);
    for(var i = 0; i <= yCount; i++){ //row
        for(var j =0; j <= xCount; j++){ //column
            var newY = yNeg ? i*-1 : i;
            var newX = xNeg ? j*-1 : j;
            var newCellId = cellIdPlusVector(startId,new Vector(newX,newY));
            var newFormula ='';
            var tokens = lex(selectedCell.formula);
            tokens.forEach(function(token){
                  if(token.type == TokenEnum.GlobalCell || token.type == TokenEnum.LocalCell){
                      var id;
                      if(token.type == TokenEnum.LocalCell){
                          id = selectedCell.tableName + '.' + token.value;
                      }
                      else{
                          id = token.value;
                      }
                      var vec = selectedCell.references[id].vector;
                      var table = Table.tables[selectedCell.tableName];
                      var calcCellId = cellIdPlusVector(newCellId,vec,table.rows, table.columns);
                      newFormula += calcCellId;
                  }
                else{
                      newFormula+= token.value;
                  }
            });

            var cell = getGlobalCell(newCellId);
            cell.evaluateNewFormula(newFormula)

        }
    }
}