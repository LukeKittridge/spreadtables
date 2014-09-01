/**
 * Created by Luke Kittridge on 14/08/2014.
 */

function evaluate(prefixExpression){
    var stack = [];
    while(prefixExpression.getLength() > 0){
        var token = prefixExpression.dequeue();

        if(token.type == TokenEnum.Number){
            stack.push(token.value);
        }

        if(token.type == (TokenEnum.GlobalCellName || TokenEnum.GlobalCell)){
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

        if(token.type == TokenEnum.Operator){
            var arg2 = parseFloat(stack.pop());
            var arg1 = parseFloat(stack.pop());

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
