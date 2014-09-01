/**
 * Created by Luke Kittridge on 23/08/2014.
 */

var variables = {};

function addVariable(name, globalCellName){
    var cellIdentifier = splitGlobalCells(globalCellName);
    var table = Table.tables[cellIdentifier.TableName];
    variables[name] = table.getCell(cellIdentifier.Cell);
}

