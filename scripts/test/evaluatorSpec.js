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

    xit("can handle multiple brackets", function () {
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
       table.addVariable("testVar", Table.tables['test'].cells[0][99]);

       var lexResult = lex("7+test.testVar");
       var parserResult = parse(lexResult);
       var expectedResult = 39;
       var actualResult = evaluate(parserResult);
       expect(actualResult).toEqual(expectedResult);
    });

    it("can handle global cells", function () {
        var table = new Table('test', 30, 100);
        Table.tables[table.name] = table;
        Table.tables['test'].cells[0][99].value = 32;

        var lexResult = lex("5+test.CV1/2");
        var parserResult = parse(lexResult);
        var expectedResult = 21;
        var actualResult = evaluate(parserResult);
        expect(actualResult).toEqual(expectedResult);

        lexResult = lex("test.CV1 + 5/2");
        parserResult = parse(lexResult);
        expectedResult = 34.5;
        actualResult = evaluate(parserResult);
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
        cell1.evaluateNewFormula("=10");
        var cell2 = getGlobalCell("#test.B2");
        cell2.evaluateNewFormula("=23");

        var cell3 = getGlobalCell("#test.B3");
        cell3.evaluateNewFormula("=B1+B2");

        expect(cell3.value).toEqual(33);
    });

    it("Can handle formulas with local cell names.", function(){
       var table = new Table("test", 30, 100);
        Table.tables[table.name] = table;

        var cell1 = getGlobalCell("#test.B1");
        cell1.evaluateNewFormula("=23");
        table.addVariable("cell1", cell1);

        var cell2 = getGlobalCell("#test.C1");
        cell2.evaluateNewFormula("=cell1 + 15");
        expect(cell2.value).toEqual(38);
    });

    it("Can handle uninitiated global cells", function(){
        var table = new Table("test", 30, 100);
        Table.tables[table.name] = table;

        var cell1 = getGlobalCell("#test.B1");
        cell1.evaluateNewFormula("=test.B2 + 5");
        expect(cell1.value).toEqual(5);
    });

    it("Can SUM ranges of cells", function(){
       var table = new Table("test", 30, 100);
        Table.tables[table.name] = table;
        var g9 = getGlobalCell('test.G9');
        g9.evaluateNewFormula('=5');

        var g10 = getGlobalCell('test.G10');
        g10.evaluateNewFormula('=test.G9+1');

        fillCells(g10,'test.G11','test.G21');

        var m20 = getGlobalCell('test.M20');
        m20.evaluateNewFormula('=SUM(test.G9:test.G21)');

        expect(m20.value).toEqual(143);
    });

    it("Can AVG ranges of cells", function(){
        var table = new Table("test", 30, 100);
        Table.tables[table.name] = table;
        var g9 = getGlobalCell('test.G9');
        g9.evaluateNewFormula('=5');

        var g10 = getGlobalCell('test.G10');
        g10.evaluateNewFormula('=test.G9+1');

        fillCells(g10,'test.G11','test.G21');

        var m20 = getGlobalCell('test.M20');
        m20.evaluateNewFormula('=AVG(test.G9:test.G21)');

        expect(m20.value).toEqual(11);
    });

    it("Can AVG ranges of cells", function(){
        var table = new Table("test", 30, 100);
        Table.tables[table.name] = table;
        var g9 = getGlobalCell('test.G9');
        g9.evaluateNewFormula('=5.4533');

        var g10 = getGlobalCell('test.G10');
        g10.evaluateNewFormula('=test.G9+1.47');

        fillCells(g10,'test.G11','test.G21');

        var m20 = getGlobalCell('test.M20');
        m20.evaluateNewFormula('=AVG(test.G9:test.G21)');

        expect(m20.value).toEqual(14.2733);
    });

    it("Can MIN ranges of cells", function(){
        var table = new Table("test", 30, 100);
        Table.tables[table.name] = table;
        var g9 = getGlobalCell('test.G9');
        g9.evaluateNewFormula('=5');

        var g10 = getGlobalCell('test.G10');
        g10.evaluateNewFormula('=test.G9+1');

        fillCells(g10,'test.G11','test.G21');
        var g15 = getGlobalCell('test.g15');
        g15.evaluateNewFormula('=-12');
        var m20 = getGlobalCell('test.M20');
        m20.evaluateNewFormula('=MIN(test.G9:test.G21)');

        expect(m20.value).toEqual(-12);
    });

    it("Can MAX ranges of cells", function(){
        var table = new Table("test", 30, 100);
        Table.tables[table.name] = table;
        var g9 = getGlobalCell('test.G9');
        g9.evaluateNewFormula('=5');

        var g10 = getGlobalCell('test.G10');
        g10.evaluateNewFormula('=test.G9+1');

        fillCells(g10,'test.G11','test.G21');
        var g15 = getGlobalCell('test.g15');
        g15.evaluateNewFormula('=874');
        var m20 = getGlobalCell('test.M20');
        m20.evaluateNewFormula('=MAX(test.G9:test.G21)');

        expect(m20.value).toEqual(880);
    });

    it("Can handle PI and E", function(){
        var table = new Table("test", 30, 100);
        Table.tables[table.name] = table;
        var g9 = getGlobalCell('test.G9');
        g9.evaluateNewFormula('=PI + E');

        expect(g9.value).toEqual(5.8599);
    });
});