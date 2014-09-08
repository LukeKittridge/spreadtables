/**
 * Created by Luke Kittridge on 25/08/2014.
 */

describe("Variable Test Suite", function() {
   it("Can split global cells", function (){
      var globalCellName = "#testTable.testCell";
       expect(splitGlobalCells(globalCellName).TableName).toEqual("testTable");
       expect(splitGlobalCells(globalCellName).Cell).toEqual("testCell");
   });

    it("Can create variables", function(){
        var table = new Table('test',30,100);
        Table.tables[table.name] = table;
        Table.tables['test'].cells[0][99].value = 32;
        table.addVariable("testVar", Table.tables['test'].cells[0][99]);
        expect(table.variables["testVar"].value).toEqual(32);

        Table.tables['test'].cells[0][99].value = 505;
        expect(table.variables["testVar"].value).toEqual(505);

    });
});
