/**
 * Created by Luke Kittridge on 12/08/2014.
 */

function parse(tokens){
    return toPostfix(tokens);
}

function toPostfix(tokens){
    var queue = new Queue();
    var stack = [];
    var topStack;
    tokens.forEach(function (token) {

        if (token.type == TokenEnum.Number || token.type == TokenEnum.GlobalCellName || token.type == TokenEnum.GlobalCell || token.type == TokenEnum.LocalCell || token.type == TokenEnum.LocalCellName) {
            queue.enqueue(token);
        }

        if(token.type == TokenEnum.Operator){
            setPrecedence(token);

            var greaterPrecedence = true;
            if(stack.length > 0) {
                while (greaterPrecedence && stack.length > 0) {
                    topStack = stack.pop();
                    if (topStack.type == TokenEnum.Operator && token.precedence < topStack.precedence || token.associativity == AssociationEnum.Left && token.precedence == topStack.precedence) {
                        queue.enqueue(topStack);
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

        if(token.type == TokenEnum.Bracket){
            if(token.value == '('){
                stack.push(token);
            }
            else{
                var rightBracket = false;
                while(!rightBracket){
                    var topStack = stack.pop();
                    if(topStack.value != '('){
                        queue.enqueue(topStack);
                    }
                    else{
                        rightBracket = true;
                    }
                }
            }
        }

    });
    var j = stack.length;
    for(var i =0; i < j; i++){
        topStack = stack.pop();
        queue.enqueue(topStack);
    }

    return queue;
}

function setPrecedence(token) {
    switch (token.value) {
        case '+':
            token.precedence = 11;
            token.associativity = AssociationEnum.Left;
            break;
        case '-':
            token.precedence = 11;
            token.associativity = AssociationEnum.Left;
            break;
        case '/':
            token.precedence = 12;
            token.associativity = AssociationEnum.Left;
            break;
        case '*':
            token.precedence = 12;
            token.associativity = AssociationEnum.Left;
            break;
        case '^':
            token.precedence = 13;
            token.associativity = AssociationEnum.Right;
            break;
    }
}


var AssociationEnum = Object.freeze({
    Left : 'Left',
    Right : 'Right',
    None : 'None'
});