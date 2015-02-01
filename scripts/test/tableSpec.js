/**
 * Created by Luke Kittridge on 23/08/2014.
 */

describe("Table Test Suite", function() {
   it("Can create cells with correct ids", function(){
     var table = new Table('test',30,100);
     Table.tables[table.name] = table;
     expect(Table.tables['test'].cells[0][0].id).toEqual('test.A1');
     expect(Table.tables['test'].cells[0][26].id).toEqual('test.AA1');
     expect(Table.tables['test'].cells[0][52].id).toEqual('test.BA1');
     expect(Table.tables['test'].cells[0][99].id).toEqual('test.CV1');

       expect(Table.tables['test'].cells[1][26].id).toEqual('test.AA2');
       expect(Table.tables['test'].cells[29][26].id).toEqual('test.AA30');
   });

    it("can get the specified cell from the table", function(){
        var table = new Table('test',30,100);
        expect(table.getCell("A1").id).toEqual("test.A1");
        expect(table.getCell("CV24").id).toEqual("test.CV24");
        expect(table.getCell("BB12").id).toEqual("test.BB12");
        expect(table.getCell("A23").id).toEqual("test.A23");
        expect(table.getCell("AD1").id).toEqual("test.AD1");
    });

    it("can evaluate and fill cells", function(){
       var table = new Table('test', 50, 50);
        Table.tables[table.name] = table;

        var d4 = table.getCell('D4');
        d4.evaluateNewFormula('=1');
        var e4 = table.getCell('E4');
        e4.evaluateNewFormula('=D4+1');

        fillCells(e4,'test.F4','test.O4');

        var j4 = table.getCell('J4');
        expect(j4.formula).toEqual('=test.I4+1');
        expect(j4.value).toEqual(7);

        var o4 = table.getCell('O4');
        expect(o4.formula).toEqual('=test.N4+1');
        expect(o4.value).toEqual(12);

        var g8 = table.getCell('G8');
        g8.evaluateNewFormula('=4+G4');
        fillCells(g8,'test.G8','test.K20');

        var k8 = table.getCell('K8');
        expect(k8.formula).toEqual('=4+test.K4');
        expect(k8.value).toEqual(12);

        var h19 = table.getCell('H19');
        expect(h19.formula).toEqual('=4+test.H15');
        expect(h19.value).toEqual(12);

        var k20 = table.getCell('K20');
        expect(k20.formula).toEqual('=4+test.K16');
        expect(k20.value).toEqual(24);
    });
});