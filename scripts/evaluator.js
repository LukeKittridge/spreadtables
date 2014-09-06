/**
 * Created by Luke Kittridge on 14/08/2014.
 */

function evaluate(prefixExpression, currentCell){
    var stack = [];
    while(prefixExpression.getLength() > 0){
        var token = prefixExpression.dequeue();

        if(token.type == TokenEnum.Number){
            stack.push(parseFloat(token.value));
        }

        if(token.type == TokenEnum.GlobalCellName || token.type == TokenEnum.GlobalCell){
            var cellNames = splitGlobalCells(token.value);

            var cell;
            if(token.type == TokenEnum.GlobalCellName)
                cell = variables[cellNames.Cell];
            else if (token.type == TokenEnum.GlobalCell){
                var table = Table.tables[cellNames.TableName];
                cell = table.getCell(cellNames.Cell);
            }

            stack.push(cell.value);
        }

        if(token.type == TokenEnum.LocalCell){
            var cellNames = splitGlobalCells(currentCell.id);
            var table = Table.tables[cellNames.TableName];

            var cell = table.getCell(token.value);

            stack.push(cell.value);
        }

        if(token.type == TokenEnum.Operator){
            var arg2 = stack.pop();
            var arg1 = stack.pop();

            switch(token.value){
                case '+':
                    stack.push(arg1 + arg2);
                    break;
                case '-':
                    stack.push(arg1 - arg2);
                    break;
                case '*':
                    stack.push(arg1 * arg2);
                    break;
                case '/':
                    stack.push(arg1 / arg2);
                    break;
                case '^':
                    stack.push(Math.pow(arg1, arg2));
                    break;
            }
        }
    }
    return +stack.pop().toFixed(4); //Round to 4 decimal places and drop extra 0s
}
