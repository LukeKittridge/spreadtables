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
});