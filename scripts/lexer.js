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
        if(input[0] == '='){
            addToken(TokenEnum.Equals, input[0]);
            i++;
        }
        if(/\d+/.test()){
            // loop looking for digits
        }
        if(/[\+\*-/]/.test(input[0])){
            addToken(TokenEnum.ArithmeticOperator, input[0]);
        }
    }
}

var TokenEnum = Object.freeze({
    Equals : 'Equals',
    ArithmeticOperator : 'ArithmeticOperator',
    Number : 'Number'
});