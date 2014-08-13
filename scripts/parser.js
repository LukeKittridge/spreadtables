/**
 * Created by Luke Kittridge on 12/08/2014.
 */

function parse(tokens){
    toPostfix(tokens);
}

function toPostfix(tokens){
    var queue = new Queue();
    var stack = [];
    var topStack;
    tokens.forEach(function (token) {

        if(token.type == TokenEnum.Number){
           queue.enqueue(token.value);
        }

        if(token.type == TokenEnum.ArithmeticOperator){
            setPrecedence(token);

            var greaterPrecedence = true;
            if(stack.length > 0) {
                while (greaterPrecedence && stack.length > 0) {
                    topStack = stack.pop();
                    if (topStack.type == TokenEnum.ArithmeticOperator && token.precedence < topStack.precedence || token.associativity == AssociationEnum.Left && token.precedence == topStack.precedence) {
                        queue.enqueue(topStack.value);
                    }
                    else {
                        greaterPrecedence = false;
                        stack.push(topStack);
                        stack.push(token);
                    }
                }
                if(greaterPrecedence)
                    stack.push(token);
            }
            else{
                stack.push(token);
            }
        }

    });
    var j = stack.length;
    for(var i =0; i < j; i++){
        topStack = stack.pop();
        queue.enqueue(topStack.value);
    }

    return queue;
}

function setPrecedence(token) {
    switch (token.value) {
        case '/':
            token.precedence = 12;
            token.associativity = AssociationEnum.Left;
            break;
        case '*':
            token.precedence = 12;
            token.associativity = AssociationEnum.Left;
            break;
        case '+':
            token.precedence = 11;
            token.associativity = AssociationEnum.Left;
            break;
        case '-':
            token.precedence = 11;
            token.associativity = AssociationEnum.Left;
            break;
    }
}


var AssociationEnum = Object.freeze({
    Left : 'Left',
    Right : 'Right',
    None : 'None'
});