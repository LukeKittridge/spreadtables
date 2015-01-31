/**
 * Created by Luke Kittridge on 23/08/2014.
 */

var currentEvaluatedCell;

function Cell(id, row, column, name){
    this.className = "cell";
    this.id = id;
    this.contentEditable = 'true';
    this.value = '';
    this.formula = '';
    this.referencedBy = {};
    this.references = {};
    this.text = '';
    this.hasError = false;
    this.row = row;
    this.column = column;
    this.tableName = name;
}

Cell.cellsEvaluated = [];

Cell.prototype.setHasError = function(hasError){
    this.hasError = hasError;
};

Cell.prototype.getHasError = function(){
    return this.hasError;
};

function splitGlobalCells(globalCellName){
    var splitResult = globalCellName.split('.');
    var tableName;
    if(splitResult[0][0] == '#'){
        tableName = splitResult[0].substring(1,splitResult[0].length);
    }
    else{
        tableName = splitResult[0];
    }

    var cell = splitResult[1];
    return { TableName : tableName, Cell : cell };
}

Cell.prototype.evaluateNewFormula = function(formula){
    if(formula[0] == '='){
        this.formula = formula;
        Cell.cellsEvaluated = [];
        this.evaluate();
    }
    else{
        this.text = formula;
        this.formula = '';
    }

};


Cell.prototype.evaluate = function(){

    currentEvaluatedCell = this;

    if(Cell.cellsEvaluated[this.id] >= IterationCount){
        throw{type:ErrorEnum.CircularReference,cell:this};
    }

    if(Cell.cellsEvaluated[this.id] == null){
        Cell.cellsEvaluated[this.id] = 1;
    }
    else{
        Cell.cellsEvaluated[this.id]++;
    }




    var lexResult = lex(this.formula);
    if(!UseJison){
        var parseResult = parse(lexResult);
        this.value = evaluate(parseResult, this);
    }else{
        this.value = parser.parse(this.formula);
    }
    this.setHasError(false);
    for(var cellId in this.references){
        var cell = this.references[cellId];
        delete cell.referencedBy[this.id];
    }

    for(var i =0; i < lexResult.length; i++){
        var token = lexResult[i];
        if(token.type == TokenEnum.GlobalCell || token.type == TokenEnum.GlobalCellName || token.type == TokenEnum.LocalCell || token.type == TokenEnum.LocalCellName ){
            if(token.type == TokenEnum.LocalCell || token.type == TokenEnum.LocalCellName){
                var cellNames = splitGlobalCells(this.id);
                var table = Table.tables[cellNames.TableName];
                cell = table.getCell(token.value);
            }
            else{
                cell = getGlobalCell(token.value);
            }

            cell.referencedBy[this.id] = this;
            this.references[cell.id] = cell;
        }
    }

    for(cellId in this.referencedBy){
        cell = this.referencedBy[cellId];
        try{
            cell.evaluate();
            Cell.cellsEvaluated = [];
        }
        catch(e){
            if(e.type != ErrorEnum.CircularReference || !IterationsAllowed ){
                e.cellId = cell.id;
                throw e;
            }
        }
    }

};


function splitCellId(cellId){
    var parts = cellId.split('.');
    var cell = parts[1];
    var regGroups = /([a-zA-Z]+)(\d+)/.exec(cell);
    return {table:parts[0],  letters : regGroups[1], numbers : regGroups[2]};
}


function findCircularReference(cell, refCell, cellArray){
    for(var cellId in refCell.references){
        if(cell.referencedBy[cellId]){
            cellArray.push(cellId);
            return cellArray;
        }
        else{
            var refCell = getGlobalCell(cellId);
            cellArray.push(cellId);
           return findCircularReference(cell, refCell, cellArray);
        }
    }
};