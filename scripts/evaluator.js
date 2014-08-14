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

        if(token.type == TokenEnum.ArithmeticOperator){
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
            }
        }
    }
    return +stack.pop().toFixed(4); //Round to 4 decimal places and drop extra 0s
}
