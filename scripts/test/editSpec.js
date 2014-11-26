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
        var actualResult = getCellIdToLeft(cellId);

        expect(actualResult).toEqual(expectedResult);
    });

    if("Should return the ID of the cell to the right of the given ID", function(){
       var cellId = "#test.A1";
        var expectedResult = "#test.B1";
        var actualResult = getCellIdToRight(cellId);

        expect(actualResult).toEqual(expectedResult);

        var cellId = "#test.Z1";
        var expectedResult = "#test.AA1";
        var actualResult = getCellIdToRight(cellId);

        expect(actualResult).toEqual(expectedResult);

        var cellId = "#test.AA1";
        var expectedResult = "#test.AB1";
        var actualResult = getCellIdToRight(cellId);

        expect(actualResult).toEqual(expectedResult);

        var cellId = "#test.AZ1";
        var expectedResult = "#test.BA1";
        var actualResult = getCellIdToRight(cellId);

        expect(actualResult).toEqual(expectedResult);
    });

    it("Should return the ID of the cell below the given ID", function(){
        var table = new Table('test',30,100); //Now need to create the table as the code expects it to exist.
        table.maxTableNumbers = table.cells.length;
        Table.tables[table.name] = table;
       var cellId = "test.A1";
        var expectedResult = "test.A2";
        var actualResult = getCellIdBelow(cellId);

        expect(actualResult).toEqual(expectedResult);

    });

    it("Should return the ID of the cell above the given ID", function(){
        var cellId = "#test.A2";
        var expectedResult = "#test.A1";
        var actualResult = getCellIdAbove(cellId);

        expect(actualResult).toEqual(expectedResult);

    });
});