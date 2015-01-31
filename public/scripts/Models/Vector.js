/**
 * Created by Luke on 31/01/2015.
 */

function Vector(x,y){
    this.x = x;
    this.y = y;
}

function cellIdDifference(cellIdA,cellIdB){

    var a = splitCellId(cellIdA);
    var b = splitCellId(cellIdB);

    var y = b.number - a.number;



}

function convertLetterToNum(letters){
    var result;
    if(letters.length == 1){
        result = letters.charCodeAt(0) - 64;
    }
    else{
        result = ((letters.charCodeAt(0) - 64) * 26) + (letters.charCodeAt(1) - 64);
    }
    return result;
}

function convertNumberToLetter(number){

    var result ='';
    if(number > 26){
        var fl = Math.floor(number/26);
        var sl = number - (fl*26);
        result = String.fromCharCode(fl +64) + String.fromCharCode(sl+64);
    }
    else{
        result = String.fromCharCode(number+64);
    }

    return result;
}