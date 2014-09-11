function lex(input){
    var i =0;
    var tokens = [];

    function addToken(type, value, start, end){
        tokens.push({
            type : type,
            value : value,
            start : start,
            end : end
        });
    }

    //Strip all whitespace
    input = input.replace(/\s+/g,'');

    while(i < input.length){
        if(input[i] == '='){ //Equals
            addToken(TokenEnum.Equals, input[i],i,i);
            i++;
        }
        else if(/[\d\.]/.test(input[i])){ // Number
            // loop looking for digits
            var number = '';
            var start = i;
            do{
                number += input[i];
                i++;
            }while(/[\d\.]/.test(input[i]) && i < input.length);
            addToken(TokenEnum.Number, number, start, i-1);
        }
        else if(/[\+\*-/^]/.test(input[i])){ //Arithmetic Symbol

            var minusCount =0;
            start = i;
            number = '';
            var unary = false;
            while(/[\+-]/.test(input[i]) && (!/\w/.test(input[i - 1]) || i ==0)  && i < input.length) {
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


                addToken(TokenEnum.Number, number, start, i-1);
            }
            else{
                addToken(TokenEnum.Operator, input[i], start, i);
                i++;
            }

        }
        else if (/[\(\)]/.test(input[i])){
            addToken(TokenEnum.Bracket, input[i],i,i);
            i++;
        }
        else if (/[#a-zA-Z]/.test(input[i])){ //Variable
            var variableName = "";
            start = i;
            do{
                 variableName += input[i];
                i++;
            }while(/[#\.\w]/.test(input[i]) && i < input.length);

            addToken(getVariableType(variableName), variableName,start,i-1);
        }
        else{
            addToken(TokenEnum.Unknown, input[i],i,i);
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
    Result : 'Result',
    Unknown : 'Unknown'
});