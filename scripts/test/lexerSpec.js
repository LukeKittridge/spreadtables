/**
 * Created by Luke Kittridge on 08/08/2014.
 */

describe("Lexer Test Suite", function(){
    it("returns unknown", function(){
        expect(lex("?")[0].type).toEqual(TokenEnum.Unknown);
    })
});