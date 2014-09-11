/**
 * Created by Luke Kittridge on 08/08/2014.
 */

describe("Lexer Test Suite", function(){
    it("returns unknown", function(){
        expect(lex("?")[0].type).toEqual(TokenEnum.Unknown);
    });

    it("returns equals, number, arithmetic, number", function(){
        var expectedResult = [{
            type : TokenEnum.Equals,
            value : '=',
            start : 0,
            end:0
        },{
            type : TokenEnum.Number,
            value : '23',
            start:1,
            end:2
        },{
            type : TokenEnum.Operator,
            value : '+',
            start:3,
            end:3
        },{
            type : TokenEnum.Number,
            value : '7',
            start:4,
            end:4
        }];

        expect(lex("=23+7")).toEqual(expectedResult);
    });

    it("can read a long number", function(){
       var expectedResult = "7894561336565";
        expect(lex("7894561336565")[0].value).toEqual(expectedResult);
    });

    it("can ignore white space", function(){
       var expectedResult = "1234";
        expect(lex(" 1234")[0].value).toEqual((expectedResult));
    });

    it("can handle negative numbers", function(){
       var expectedResult = "-35";
        expect(lex("-35")[0].value).toEqual(expectedResult);
    });

    it("can handle double negative numbers", function(){
        var expectedResult = "35";
        expect(lex("--35")[0].value).toEqual(expectedResult);
    });

    it("can handle more complex expressions with negative numbers", function(){
       var expectedResult = [
           {
               type: TokenEnum.Number,
               value:'73',
               start:0,
               end:1
           },
           {
               type: TokenEnum.Operator,
               value:'+',
               start:2,
               end:2
           },
           {
               type: TokenEnum.Number,
               value:'-35',
               start:3,
               end:5
           },
           {
               type: TokenEnum.Operator,
               value:'*',
               start:6,
               end:6
           },
           {
               type: TokenEnum.Number,
               value:'4',
               start:7,
               end:8
           },
           {
               type: TokenEnum.Operator,
               value:'+',
               start:9,
               end:9
           },
           {
               type: TokenEnum.Number,
               value:'-2',
               start:10,
               end:13
           }
       ];
        expect(lex("73+-35*+4+---2")).toEqual(expectedResult);
    });

    it("can handle local cell names", function(){
        var expectedResult = [{ type: TokenEnum.LocalCellName, value: "test", start:0, end:3 }];
        var result = lex("test");
        expect(result).toEqual(expectedResult);
    });

    it("can handle table names", function(){
        var expectedResult = [{ type: TokenEnum.TableName, value: "#testTable", start:0, end:9 }];
        var result = lex("#testTable");
        expect(result).toEqual(expectedResult);
    });

    it("can handle local cells", function(){
        var expectedResult = [{ type: TokenEnum.LocalCell, value: "A1", start:0, end:1 }];
        var result = lex("A1");
        expect(result).toEqual(expectedResult);
    });

    it("can handle local cells", function(){
        var expectedResult = [{ type: TokenEnum.LocalCell, value: "AA1", start:0, end:2 }];
        var result = lex("AA1");
        expect(result).toEqual(expectedResult);
    });

    it("can handle global cell names", function(){
        var expectedResult = [{ type: TokenEnum.GlobalCellName, value: "#test.testCell", start:0, end:13 }];
        var result = lex("#test.testCell");
        expect(result).toEqual(expectedResult);
    });

    it("can handle global cells", function(){
        var expectedResult = [{ type: TokenEnum.GlobalCell, value: "#test.A1", start:0, end:7 }];
        var result = lex("#test.A1");
        expect(result).toEqual(expectedResult);
    });

    it("can return unknown for variables", function(){
        var expectedResult = [{ type: TokenEnum.Unknown, value: "#test..A1", start:0, end:8 }];
        var result = lex("#test..A1");
        expect(result).toEqual(expectedResult);
    });

    it("can handle local cell names in formulas", function(){
        var expectedResult = [
            { type: TokenEnum.Number, value: '5', start:0,end:0 },
            { type: TokenEnum.Operator, value: '+',start:1,end:1 },
            { type: TokenEnum.LocalCellName, value: "test12",start:2,end:7 },
            { type: TokenEnum.Operator, value: '/', start:8, end:8 },
            { type: TokenEnum.Number, value: '3', start:9,end:9 }
        ];
        var result = lex("5+test12/3");
        expect(result).toEqual(expectedResult);
    });

});