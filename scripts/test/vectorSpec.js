
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
    });
});