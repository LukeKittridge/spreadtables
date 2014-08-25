/**
 * Created by Luke Kittridge on 25/08/2014.
 */

describe("Variable Test Suite", function() {
   it("Can split global cells", function (){
      var globalCellName = "#testTable.testCell";
       expect(splitGlobalCells(globalCellName).TableName).toEqual("testTable");
       expect(splitGlobalCells(globalCellName).Cell).toEqual("testCell");
   });
});
