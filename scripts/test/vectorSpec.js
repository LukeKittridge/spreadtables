
describe("Vector Test Suite", function(){
    it("Can convert cell letters to a number.", function(){
        var value = 'A';
        var expectedResult = 1;
        var actualResult = convertLetterToNum(value);
        expect(actualResult).toEqual(expectedResult);


        value = 'AA';
        expectedResult = 27;
        actualResult = convertLetterToNum(value);
        expect(actualResult).toEqual(expectedResult);

        value = 'BA';
        expectedResult = 53;
        actualResult = convertLetterToNum(value);
        expect(actualResult).toEqual(expectedResult);
    });

    it("Can convert number to letters", function(){
       var value = 1;
        var expectedResult = 'A';
        var actualResult = convertNumberToLetter(value);
        expect(actualResult).toEqual(expectedResult);

        value = 27;
        expectedResult = 'AA';
        actualResult = convertNumberToLetter(value);
        expect(actualResult).toEqual(expectedResult);

        value = 53;
        expectedResult = 'BA';
        actualResult = convertNumberToLetter(value);
        expect(actualResult).toEqual(expectedResult);

        value = 130;
        expectedResult = 'DZ';
        actualResult = convertNumberToLetter(value);
        expect(actualResult).toEqual(expectedResult);
    });

    it("Can create a difference vector", function(){
       var cellA = 'table1.B3';
        var cellB = 'table1.E1';
        var expectedResult = new Vector(3,-2);
        var actualResult = cellIdDifference(cellA,cellB);
        expect(actualResult).toEqual(expectedResult);

        cellA = 'table1.B3';
        cellB = 'table1.A8';
        expectedResult = new Vector(-1,5);
        actualResult = cellIdDifference(cellA,cellB);
        expect(actualResult).toEqual(expectedResult);

        cellA = 'table1.E2';
        cellB = 'table1.BZ24';
        expectedResult = new Vector(73,22);
        actualResult = cellIdDifference(cellA,cellB);
        expect(actualResult).toEqual(expectedResult);
    });

    it("Can add vectors to cell Ids", function(){
       var cell = 'table1.E2';
        var vec = new Vector(73,22);
        var expectedResult = 'table1.BZ24';
        var actualResult = cellIdPlusVector(cell,vec);
        expect(actualResult).toEqual(expectedResult);
    });
});