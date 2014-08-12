/**
 * Created by Luke Kittridge on 08/08/2014.
 */

describe("Lexer Test Suite", function(){
    it("returns unknown", function(){
        expect(lex("?")[0].type).toEqual(TokenEnum.Unknown);
    })

    it("returns equals, number, arithmetic, number", function(){
        var expectedResult = [{
            type : TokenEnum.Equals,
            value : '='
        },{
            type : TokenEnum.Number,
            value : '23'
        },{
            type : TokenEnum.ArithmeticOperator,
            value : '+'
        },{
            type : TokenEnum.Number,
            value : '7'
        }];

        expect(lex("=23+7")).toEqual(expectedResult);
    })

    it("can read a long number", function(){
       var expectedResult = "7894561336565";
        expect(lex("7894561336565")[0].value).toEqual(expectedResult);
    });
});