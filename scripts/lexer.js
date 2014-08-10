function lex(input){
    var i =0;
    var tokens = [];

    function addToken(type, value){
        tokens.push({
            type : type,
            value : value
        });
    }

    while(i < input.length){
        if(input[i] == ' '){ //Whitespace
            i++;
        }
        else if(input[i] == '='){ //Equals
            addToken(TokenEnum.Equals, input[0]);
            i++;
        }
        else if(/\d+/.test(input[i])){ // Number
            // loop looking for digits
            var number = '';
            do{
                number += input[i];
                i++;
            }while(/\d+/.test(input[i]) && i < input.length)
            addToken(TokenEnum.Number, number);
        }
        else if(/[\+\*-/]/.test(input[i])){ //Arithmetic Symbol
            addToken(TokenEnum.ArithmeticOperator, input[i]);
            i++;
        }
        else{
            addToken(TokenEnum.Unknown, input[i]);
            i++;
        }
    }

    return tokens;
}

var TokenEnum = Object.freeze({
    Equals : 'Equals',
    ArithmeticOperator : 'ArithmeticOperator',
    Number : 'Number',
    Unknown : 'Unknown'
});