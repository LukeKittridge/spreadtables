/**
 * Created by Luke Kittridge on 23/08/2014.
 */

var variables = {};

function addVariables(name, globalCellName){

}

function splitGlobalCells(globalCellName){
    var splitResult = globalCellName.split('.');
    var tableName = splitResult[0].substring(1,splitResult[0].length);
    var cell = splitResult[1];
    return { TableName : tableName, Cell : cell };
}