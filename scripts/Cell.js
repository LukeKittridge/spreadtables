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

function splitGlobalCells(globalCellName){
    var splitResult = globalCellName.split('.');
    var tableName = splitResult[0].substring(1,splitResult[0].length);
    var cell = splitResult[1];
    return { TableName : tableName, Cell : cell };
}

Cell.prototype.evaluateNewFormula = function(formula){
  this.formula = formula;
  this.evaluate();
};

Cell.prototype.evaluate = function(){

    for(var cellId in this.references){
        var cell = this.references[cellId];
        delete cell.referencedBy[this.id];
    }

    var lexResult = lex(this.formula);
    var parseResult = parse(lexResult);
    var evaluationResult = evaluate(parseResult);
    this.value = evaluationResult;

    for(var i =0; i < lexResult.length; i++){
        if(lexResult[i].type == TokenEnum.GlobalCell){
            var cell = getGlobalCell(lexResult[i].value);
            cell.referencedBy[this.id] = this;
            this.references[cell.id] = cell;
        }
    }

    for(var cellId in this.referencedBy){
        var cell = this.referencedBy[cellId];
        cell.evaluate();
    }

};