/**
 * Created by Luke on 10/01/2015.
 */

describe("Jison Parser Test Suite", function(){
    it("9+7", function (){
       var actualResult = parser.parse("9+7");
        var expectedResult = 16;
        expect(actualResult).toEqual(expectedResult);
    })

});