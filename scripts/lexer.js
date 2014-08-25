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
            }while(/[\d\.]/.test(input[i]) && i < input.length);
            addToken(TokenEnum.Number, number);
        }
        else if(/[\+\*-/^]/.test(input[i])){ //Arithmetic Symbol

            var minusCount =0;
            number = '';
            var unary = false;
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
                }while(/[\d\.]/.test(input[i]) && i < input.length);


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
        else if (/[#a-zA-Z]/.test(input[i])){
            var variableName = "";
            do{
                 variableName += input[i];
                i++;
            }while(/[#\.\w]/.test(input[i]) && i < input.length);

            addToken(getVariableType(variableName), variableName);
        }
        else{
            addToken(TokenEnum.Unknown, input[i]);
            i++;
        }
    }

    return tokens;
}

function getVariableType(variableName){
    if(/^#\w+$/.test(variableName)){
        return TokenEnum.TableName;
    }
    else if(/^[a-zA-Z](?:[a-zA-Z][a-zA-Z]\w*)?$/.test(variableName)){
        return TokenEnum.LocalCellName;
    }
    else if(/^[a-zA-Z]{1,2}[1-9]\d?$/.test(variableName)){
        return TokenEnum.LocalCell;
    }
    else if(/^#\w+.[a-zA-Z](?:[a-zA-Z][a-zA-Z]\w*)?$/.test(variableName)){
       return TokenEnum.GlobalCellName;
    }
    else if(/^#\w+.[a-zA-Z]{1,2}[1-9]\d?$/.test(variableName)){
        return TokenEnum.GlobalCell;
    }
    else{
        return TokenEnum.Unknown;
    }
}

var TokenEnum = Object.freeze({
    Equals : 'Equals',
    Operator : 'Operator',
    Number : 'Number',
    Bracket : 'Bracket',
    TableName : 'TableName',
    LocalCellName : 'LocalCellName',
    LocalCell : 'LocalCell',
    GlobalCellName : 'GlobalCellName',
    GlobalCell : 'GlobalCell',
    Unknown : 'Unknown'
});