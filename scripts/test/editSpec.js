/**
 * Created by Luke Kittridge on 12/10/2014.
 */

describe("Edit Test Suite", function(){
   it("Should return ID of the cell to the left of the given ID", function(){
       var cellId = "#test.C1";
       var expectedResult = "#test.B1";
       var actualResult = getCellIdToLeft(cellId);

       expect(actualResult).toEqual(expectedResult);

       cellId = "#test.AG2";
       expectedResult = "#test.AF2";
       actualResult = getCellIdToLeft(cellId);

       expect(actualResult).toEqual(expectedResult);

       cellId = "#test.BA23";
       expectedResult = "#test.AZ23";
       actualResult = getCellIdToLeft(cellId);

       expect(actualResult).toEqual(expectedResult);

       cellId = "#test.AA7";
       expectedResult = "#test.Z7";
       actualResult = getCellIdToLeft(cellId);

       expect(actualResult).toEqual(expectedResult);
   });

    it("Should return the same cell ID", function(){
        var cellId = "#test.A14";
        var expectedResult = "#test.A14";
        actualResult = getCellIdToLeft(cellId);

        expect(actualResult).toEqual(expectedResult);
    })
});