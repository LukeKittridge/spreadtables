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
        else if(/[\d\.]/.test(input[i])){ // Number
            // loop looking for digits
            var number = '';
            do{
                number += input[i];
                i++;
            }while(/[\d\.]/.test(input[i]) && i < input.length)
            addToken(TokenEnum.Number, number);
        }
        else if(/[\+\*-/^]/.test(input[i])){ //Arithmetic Symbol

            var minusCount =0;
            var number = '';
            var unary = false
            while(/[\+-]/.test(input[i]) && !/\d/.test(input[i - 1])  && i < input.length) {
                if(/-/.test(input[i])){
                    minusCount++;
                }
                    unary = true;
                    i++; //Ignore plus signs
            }

            if(unary){
                if(minusCount > 0 && minusCount % 2 != 0){
                    number += '-';
                }
                do{
                    number += input[i];
                    i++;
                }while(/[\d\.]/.test(input[i]) && i < input.length)


                addToken(TokenEnum.Number, number);
            }
            else{
                addToken(TokenEnum.Operator, input[i]);
                i++;
            }

        }
        else if (/[\(\)]/.test(input[i])){
            addToken(TokenEnum.Bracket, input[i]);
            i++;
        }
        else if (/[a-zA-Z]/.test(input[i])){
            var variableName = "";
            do{
                 variableName += input[i];
                i++;
            }while(/[a-zA-z\d]/.test(input[i]) && i < input.length)

            addToken(TokenEnum.Variable, variableName);
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
    Operator : 'Operator',
    Number : 'Number',
    Bracket : 'Bracket',
    Variable : 'Variable',
    Unknown : 'Unknown'
});