/**
 * Created by Luke Kittridge on 13/08/2014.
 */

describe("Parser Test Suite", function(){
    it("Converts 2+3*4-5 to postfix", function(){
       var lexResult = lex("2+3*4-5");
        var expectedResult = ['2','3','4','*','+','5','-'];
        var actualResult = queueToArray(toPostfix(lexResult));
        expect(actualResult).toEqual(expectedResult);
    });

    it("Converts 53+412*94-152/14 to postfix", function(){
       var lexResult = lex("53+412*94-152/14");
        var expectedResult = ['53','412','94','*','+','152','14','/','-'];
        var actualResult = queueToArray(toPostfix(lexResult));
        expect(actualResult).toEqual(expectedResult);
    });

    it("Converts 5/3 to postfix", function(){
        var lexResult = lex("5/3");
        var expectedResult = ['5','3','/'];
        var actualResult = queueToArray(toPostfix(lexResult));
        expect(actualResult).toEqual(expectedResult);
    });

});

function queueToArray(queue){
    var array = [];
    var j = queue.getLength();
    for(var i =0; i < j; i++){
        array.push(queue.dequeue().value);
    }
    return array;
}