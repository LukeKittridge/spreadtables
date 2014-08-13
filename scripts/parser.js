/**
 * Created by Luke Kittridge on 12/08/2014.
 */

function parse(tokens){
    toPostfix(tokens);
}

function toPostfix(tokens){
    var queue = new Queue();
    var stack = [];
    tokens.forEach(function (token) {

        if(token.type == TokenEnum.Number){
           queue.enqueue(token.value);
        }

        if(token.type == TokenEnum.ArithmeticOperator){
            setPrecedence(token);

            var greaterPrecedence = true;
            while(greaterPrecedence){
                var topStack = stack.pop();
                if (topStack.type == TokenEnum.ArithmeticOperator && token.precedence < topStack.precedence || token.associativity == AssociationEnum.Left && token.precedence == topStack.precedence) {
                    queue.enqueue(topStack.value);
                }
                else {
                    greaterPrecedence = false;
                    stack.push(topStack);
                    stack.push(token);
                }
            }
        }

    });
}

function setPrecedence(token) {
    switch (token) {
        case '/':
            token.precedence = 12;
            token.associativity = AssociationEnum.Left;
            break;
        case '*':
            token.precedence = 12;
            token.associativity = AssociationEnum.Left;
            break;
        case '+':
            token.precedence = '11';
            token.associativity = AssociationEnum.Left;
            break;
        case '-':
            token.precedence = '11';
            token.associativity = AssociationEnum.Left;
            break;
    }
}


var AssociationEnum = Object.freeze({
    Left : 'Left',
    Right : 'Right',
    None : 'None'
});