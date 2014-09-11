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

            stack.push({token:token,value:cell.value});
        }

        if(token.type == TokenEnum.LocalCell || token.type == TokenEnum.LocalCellName){
            var cellNames = splitGlobalCells(currentCell.id);
            var cell;
            var table = Table.tables[cellNames.TableName];
            if(token.type == TokenEnum.LocalCell){
                cell = table.getCell(token.value);
            }
            else{
                cell = table.variables[token.value];
            }


            stack.push({token:token,value:cell.value});
        }

        if(token.type == TokenEnum.Operator){
            var arg2 = stack.pop();
            var arg1 = stack.pop();
            stack.push(calculate(token.value, arg1, arg2));

        }
    }
    return +stack.pop().value.toFixed(4); //Round to 4 decimal places and drop extra 0s
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
