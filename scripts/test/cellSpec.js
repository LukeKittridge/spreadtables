/**
 * Created by Luke Kittridge on 02/09/2014.
 */

describe("Cell Test Suite", function() {
   it("Updates cells that reference it", function(){
       var table = new Table('test', 30, 100);
       Table.tables[table.name] = table;

       var cell1 = getGlobalCell("#test.B1");
       cell1.evaluateNewFormula("45");
       expect(cell1.value).toEqual(45);

       var cell2 = getGlobalCell("#test.C1");
       var cell3 = getGlobalCell("#test.CB14");

       cell2.evaluateNewFormula("#test.B1 + 5");
       cell3.evaluateNewFormula("#test.C1 + #test.B1");
       expect(cell2.value).toEqual(50);
       expect(cell3.value).toEqual(95);

       cell1.evaluateNewFormula("100");
       expect(cell2.value).toEqual(105);
        expect(cell3.value).toEqual(205);


       expect(cell1.referencedBy[cell2.id]).toBeDefined();
        cell2.evaluateNewFormula("23");
       expect(cell1.referencedBy[cell2.id]).toBeUndefined();

       expect(cell3.value).toEqual(123);

   });

    it("Can handle chains of references", function(){
        var table = new Table('test', 30, 100);
        Table.tables[table.name] = table;

        var cell1 = getGlobalCell("#test.A1");
        cell1.evaluateNewFormula("1");

        var cell2 = getGlobalCell("#test.B1");
        cell2.evaluateNewFormula("2");

        var cell3 = getGlobalCell("#test.C1");
        cell3.evaluateNewFormula("A1+B1");
        expect(cell3.value).toEqual(3);

        var cell4 = getGlobalCell("#test.D1");
        cell4.evaluateNewFormula("C1");
        expect(cell4.value).toEqual(3);

        cell1.evaluateNewFormula("3");
        expect(cell3.value).toEqual(5);

        expect(cell4.value).toEqual(5);
    });
});