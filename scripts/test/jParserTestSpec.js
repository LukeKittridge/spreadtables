/**
 * Created by Luke on 10/01/2015.
 */

describe("Jison Parser Test Suite", function(){
    it("9+7", function (){
       var actualResult = parser.parse("9+7");
        var expectedResult = 16;
        expect(actualResult).toEqual(expectedResult);
    });

    it("12354*978+3456/343*2345-4512/3/3/3+64-17+7", function(){
        var expectedResult = 12105726.643990928;
        var actualResult = parser.parse("12354*978+3456/343*2345-4512/3/3/3+64-17+7");
        expect(actualResult).toEqual(expectedResult);
    });

    it("-3+4", function(){
        var expectedResult =1;
        var actualResult = parser.parse("-3+4");
        expect(actualResult).toEqual(expectedResult);
    });

    it("Can handle unary operators", function(){
       var expectedResult = -49.086956521739125;
        var actualResult = parser.parse("9*+56/23----4---75");
        expect(actualResult).toEqual(expectedResult);
    });

    it("can handle negative numbers", function(){
       var expectedResult = 9;
        var actualResult = parser.parse("4--5");
        expect(actualResult).toEqual(expectedResult);
    });

    it("Can handle decimals", function () {
       var expectedResult = 13.797;
        var actualResult = parser.parse("4.375+9.422");
        expect(actualResult).toEqual(expectedResult);
    });

    it("Can handle brackets", function(){
       var expectedResult = 63;
        var actualResult = parser.parse("(4+3)*9");
        expect(actualResult).toEqual(expectedResult);
    });

    it("Can handle multiple brackets", function(){
       var expectedResult = 9;
        var actualResult = parser.parse("(7/(4+3))*9");
        expect(actualResult).toEqual(expectedResult);
    });

    it("Can handle simple exponents", function(){
        var expectedResult = 251029.9544154469;
        var actualResult = parser.parse("2^(3*6-4^-2)");
        expect(actualResult).toEqual(expectedResult);
    });

    it("can handle looking up global variables", function(){
        var table = new Table('test', 30, 100);
        Table.tables[table.name] = table;
        Table.tables['test'].cells[0][99].value = 32;
        table.addVariable("testVar", Table.tables['test'].cells[0][99]);
        currentEvaluatedCell = Table.tables['test'].cells[0][0];

        var expectedResult = 39;
        var actualResult = parser.parse("7+test.testVar");
        expect(actualResult).toEqual(expectedResult);

    });

    it("can handle global cells", function (){
        var table = new Table('test', 30, 100);
        Table.tables[table.name] = table;
        Table.tables['test'].cells[0][99].value = 32;

        currentEvaluatedCell = Table.tables['test'].cells[0][0];

        var expectedResult = 21;
        var actualResult = parser.parse("5+test.CV1/2");
        expect(actualResult).toEqual(expectedResult);

        expectedResult = 34.5;
        actualResult = parser.parse("test.CV1 + 5/2");
        expect(actualResult).toEqual(expectedResult);

    });

    it("can evaluate single numbers", function () {
       var expectedResult = 35;
        var actualResult = parser.parse('35');
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

});