/**
 * Created by Luke Kittridge on 23/08/2014.
 */

function Cell(id){
    this.className = "cell";
    this.id = id;
    this.contentEditable = 'true';
    this.value = '';
    this.formula = '';
    this.referencedBy = {};
    this.references = {};
}

Cell.cellsEvaluated = [];

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
  this.formula = formula;
  Cell.cellsEvaluated = [];
  this.evaluate();
};


Cell.prototype.evaluate = function(){

    if(Cell.cellsEvaluated[this.id] >= IterationCount){
        throw{type:ErrorEnum.CircularReference,cell:this};
    }

    if(Cell.cellsEvaluated[this.id] == null){
        Cell.cellsEvaluated[this.id] = 1;
    }
    else{
        Cell.cellsEvaluated[this.id]++;
    }


    for(var cellId in this.references){
        var cell = this.references[cellId];
        delete cell.referencedBy[this.id];
    }

    var lexResult = lex(this.formula);
    var parseResult = parse(lexResult);
    var evaluationResult = evaluate(parseResult, this);
    this.value = evaluationResult;

    for(var i =0; i < lexResult.length; i++){
        if(lexResult[i].type == TokenEnum.GlobalCell || lexResult[i].type == TokenEnum.GlobalCellName || lexResult[i].type == TokenEnum.LocalCell){
            var cell;
            if(lexResult[i].type == TokenEnum.LocalCell){
                var cellNames = splitGlobalCells(this.id);
                var table = Table.tables[cellNames.TableName];
                cell = table.getCell(lexResult[i].value);
            }
            else{
                cell = getGlobalCell(lexResult[i].value);
            }

            cell.referencedBy[this.id] = this;
            this.references[cell.id] = cell;
        }
    }

    for(var cellId in this.referencedBy){
        var cell = this.referencedBy[cellId];
        try{
            cell.evaluate();
            Cell.cellsEvaluated = [];
        }
        catch(e){
            if(!IterationsAllowed){
                throw e;
            }
        }
    }

};