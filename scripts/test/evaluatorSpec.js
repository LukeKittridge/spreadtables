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
   });

    it("12354*978+3456/343*2345-4512/3/3/3+64-17+7", function () {
        var lexResult = lex("12354*978+3456/343*2345-4512/3/3/3+64-17+7");
        var parserResult = parse(lexResult);
        var expectedResult = 12105726.644;
        var actualResult = evaluate(parserResult);
        expect(actualResult).toEqual(expectedResult);
    });

    it("5/3", function () {
        var lexResult = lex("5/3");
        var parserResult = parse(lexResult);
        var expectedResult = 1.6667;
        var actualResult = evaluate(parserResult);
        expect(actualResult).toEqual(expectedResult);
    });

    it("-3+4", function () {
        var lexResult = lex("-3+4");
        var parserResult = parse(lexResult);
        var expectedResult = 1;
        var actualResult = evaluate(parserResult);
        expect(actualResult).toEqual(expectedResult);
    });

    it("Can handle unary operators", function() {
        var lexResult = lex("9*+56/23----4---75");
        var parserResult = parse(lexResult);
        var expectedResult = -49.087;
        var actualResult = evaluate(parserResult);
        expect(actualResult).toEqual(expectedResult);
    });

    it("Can handle negative subtraction", function() {
       var lexResult = lex("4--5");
        var parserResult = parse(lexResult);
        var expectedResult = 9;
        var actualResult = evaluate(parserResult);
        expect(actualResult).toEqual(expectedResult);
    });

    it("Can handle decimals", function () {
        var lexResult = lex("4.375+9.422");
        var parserResult = parse(lexResult);
        var expectedResult = 13.797;
        var actualResult = evaluate(parserResult);
        expect(actualResult).toEqual(expectedResult);
    });

    it("can handle brackets", function () {
        var lexResult = lex("(4+3)*9");
        var parserResult = parse(lexResult);
        var expectedResult = 63;
        var actualResult = evaluate(parserResult);
        expect(actualResult).toEqual(expectedResult);
    });

    it("can handle multiple brackets", function () {
        var lexResult = lex("(7/(4+3))*9");
        var parserResult = parse(lexResult);
        var expectedResult = 9;
        var actualResult = evaluate(parserResult);
        expect(actualResult).toEqual(expectedResult);
    });

    it("can handle simple exponents", function () {
        var lexResult = lex("2^3");
        var parserResult = parse(lexResult);
        var expectedResult = 8;
        var actualResult = evaluate(parserResult);
        expect(actualResult).toEqual(expectedResult);
    });

    it("can handle complex exponents", function () {
        var lexResult = lex("2^(3*6-4^-2)");
        var parserResult = parse(lexResult);
        var expectedResult = 251029.9544;
        var actualResult = evaluate(parserResult);
        expect(actualResult).toEqual(expectedResult);
    });

   it("can handle looking up global variables", function () {
        var table = new Table('test', 30, 100);
       Table.tables[table.name] = table;
       Table.tables['test'].cells[0][99].value = 32;
       addVariable("testVar", "#test.CV1");

       var lexResult = lex("7+#test.testVar");
       var parserResult = parse(lexResult);
       var expectedResult = 39;
       var actualResult = evaluate(parserResult);
       expect(actualResult).toEqual(expectedResult);
    })

    it("can handle global cells", function () {
        var table = new Table('test', 30, 100);
        Table.tables[table.name] = table;
        Table.tables['test'].cells[0][99].value = 32;

        var lexResult = lex("5+#test.CV1/2");
        var parserResult = parse(lexResult);
        var expectedResult = 21;
        var actualResult = evaluate(parserResult);
        expect(actualResult).toEqual(expectedResult);

        var lexResult = lex("#test.CV1 + 5/2");
        var parserResult = parse(lexResult);
        var expectedResult = 34.5;
        var actualResult = evaluate(parserResult);
        expect(actualResult).toEqual(expectedResult);
    });

    it("can evaluate single numbers", function () {
       var lexResult = lex("35");
        var parserResult = parse(lexResult);
        var expectedResult = 35;
        var actualResult = evaluate(parserResult);
        expect(actualResult).toEqual(expectedResult);
    });

    it("Can handle formulas with local cells.", function () {
        var table = new Table('test', 30, 100);
        Table.tables[table.name] = table;

        var cell1 = getGlobalCell("#test.B1");
        cell1.evaluateNewFormula("10");
        var cell2 = getGlobalCell("#test.B2");
        cell2.evaluateNewFormula("23");

        var cell3 = getGlobalCell("#test.B3");
        cell3.evaluateNewFormula("B1+B2");

        expect(cell3.value).toEqual(33);
    });
});