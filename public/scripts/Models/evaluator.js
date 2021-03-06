/**
 * Created by Luke Kittridge on 14/08/2014.
 */

function evaluate(prefixExpression, currentCell){
    var stack = [];
    while(prefixExpression.getLength() > 0){
        var token = prefixExpression.dequeue();

        if(token.type == TokenEnum.Number){
            stack.push({token:token, value : parseFloat(token.value)});
        }

        if(token.type == TokenEnum.GlobalCellName || token.type == TokenEnum.GlobalCell){
            var cellNames = splitGlobalCells(token.value);
            var table = Table.tables[cellNames.TableName];
            var cell;
            if(token.type == TokenEnum.GlobalCellName)
                cell = table.variables[cellNames.Cell];
            else if (token.type == TokenEnum.GlobalCell){
                cell = table.getCell(cellNames.Cell);
            }
            if(cell.value == ""){
                cell.value = 0;
            }
            stack.push({token:token,value:cell.value});
        }

        if(token.type == TokenEnum.LocalCell || token.type == TokenEnum.LocalCellName){
            var cellNames = splitGlobalCells(currentCell.id);
            var cell;
            var table = Table.tables[cellNames.TableName];
            cell = table.getCell(token.value);

            if(cell.value == ""){
                cell.value = 0;
            }
            stack.push({token:token,value:cell.value});
        }

        if(token.type == TokenEnum.Operator){
            var arg2 = stack.pop();
            var arg1 = stack.pop();
            if(!arg2 || !arg1) {
                var nextOp = prefixExpression.dequeue();
                if (arg2 && nextOp) {
                    throw {type: ErrorEnum.Syntax, location: nextOp};
                } else {
                    throw {type: ErrorEnum.Syntax, location: token};
                }
            }
            stack.push(calculate(token.value, arg1, arg2));

        }
    }
    return +stack.pop().value.toFixed(4); //Round to 4 decimal places and drop extra 0s
}

function calculateWrapper(operator, arg1, arg2){
    var a1 = {};
    a1.value = arg1;
    var a2 = {};
    a2.value = arg2;
    return calculate(operator,a1,a2).value;
}

function calculate(operator, arg1, arg2){
    var tokens = [arg1, arg2];
    var result;
    switch(operator){
        case '+':
            result = add(arg1,arg2);
            break;
        case '-':
            result = subtract(arg1,arg2);
            break;
        case '*':
            result = multiply(arg1,arg2);
            break;
        case '/':
            result = divide(arg1,arg2);
            break;
        case '^':
            result  = power(arg1,arg2);
            break;
    }
    return {type: TokenEnum.Result, tokens: tokens, value:result};
}

function add(arg1, arg2){
    var result = arg1.value+arg2.value;
    return result;
}

function subtract(arg1, arg2){
    var result = arg1.value - arg2.value;
    return result;
}

function divide(arg1, arg2){
    if(arg2.value == 0){
        throw {type:ErrorEnum.DivideByZero,location:arg2}
    }
    var result = arg1.value/arg2.value;
    return result;
}

function multiply(arg1, arg2){
    var result = arg1.value * arg2.value;
    return result;
}

function power(arg1, arg2){
    var result = Math.pow(arg1.value, arg2.value);
    return result;
}

function sum(range){
    var cells = CellController.getCellsInRange(range);
    var sum = 0;
    cells.forEach(function(cellId){
        var cell = getGlobalCell(cellId);
        sum += cell.value;
    });
    return sum;
}

function average(range){
    var cells = CellController.getCellsInRange(range);
    var tempSum = sum(range);
    return tempSum / cells.length;
}

function findMin(range){
    var cells = CellController.getCellsInRange(range);
    var min = getGlobalCell(cells[0]).value;
    cells.forEach(function(cellID){
       var cell = getGlobalCell(cellID);
        if(cell.value < min){
            min = cell.value;
        }
    });
    return min;
}

function findMax(range){
    var cells = CellController.getCellsInRange(range);
    var max = getGlobalCell(cells[0]).value;
    cells.forEach(function(cellID){
       var cell = getGlobalCell(cellID);
        if(cell.value > max){
            max = cell.value;
        }
    });
    return max;
}

function functionWrapper(name,range){
    var result;
    switch(name){
        case "SUM":
            result = sum(range);
            break;
        case "AVG":
            result = average(range);
            break;
        case "MIN":
            result = findMin(range);
            break;
        case "MAX":
            result = findMax(range);
            break;
    }
    return result;
}