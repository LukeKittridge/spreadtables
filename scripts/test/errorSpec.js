/**
 * Created by Luke Kittridge on 09/09/2014.
 */

describe("Error Test Suite", function(){
   it("Can detect division by 0", function(){
       var table = new Table('test', 30, 100);
       Table.tables[table.name] = table;

       var cell1 = getGlobalCell("#test.B1");
       try{
           cell1.evaluateNewFormula("4/0");
       }
       catch(e){
           expect(e.type).toEqual(ErrorEnum.DivideByZero);
       }

       try{
           cell1.evaluateNewFormula("3/0.000");
       }
       catch(e){
           expect(e.type).toEqual(ErrorEnum.DivideByZero);
       }
   });

    it("Can handle circular references with local cells", function(){
        var table = new Table('test', 30, 100);
        Table.tables[table.name] = table;

        var cell1 = getGlobalCell("#test.A1");
        cell1.evaluateNewFormula("B1");

        var cell2 = getGlobalCell("#test.B1");
        //cell2.evaluateNewFormula("A1");

        expect(function(){cell2.evaluateNewFormula("A1")}).toThrow();
    });

//    it("Can handle circular references with global cells", function(){
//        var table = new Table('test', 30, 100);
//        Table.tables[table.name] = table;
//
//        var cell1 = getGlobalCell("#test.A1");
//        cell1.evaluateNewFormula("#test.B1");
//
//        var cell2 = getGlobalCell("#test.B1");
//        cell2.evaluateNewFormula("#test.A1");
//    });
});