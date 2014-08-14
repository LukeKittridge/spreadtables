/**
 * Created by user on 14/08/2014.
 */

describe("Evaluator Test Suite", function () {
   it("9+7", function () {
       var lexResult = lex("9+7");
       var parserResult = parse(lexResult);
       var expectedResult = 16;
       var actualResult = evaluate(parserResult);
       expect(actualResult).toEqual(expectedResult);
   })

    it("12354*978+3456/343*2345-4512/3/3/3+64-17+7", function () {
        var lexResult = lex("12354*978+3456/343*2345-4512/3/3/3+64-17+7");
        var parserResult = parse(lexResult);
        var expectedResult = 12105726.644;
        var actualResult = evaluate(parserResult);
        expect(actualResult).toEqual(expectedResult);
    })

    it("5/3", function () {
        var lexResult = lex("5/3");
        var parserResult = parse(lexResult);
        var expectedResult = 1.6667;
        var actualResult = evaluate(parserResult);
        expect(actualResult).toEqual(expectedResult);
    })
});