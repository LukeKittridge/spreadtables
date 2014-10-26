/**
 * Created by Luke Kittridge on 12/10/2014.
 */

/**
 * Returns a string with the character at the index replaced by the specified character
 * @param index - Index of character to be replaced.
 * @param character - New Character
 * @returns {string}
 */
String.prototype.replaceCharAt = function(index, character){
    return this.substring(0,index) + character + this.substring(index+1);
}


const cellWidth = 100, cellHeight = 22, titleBarHeight = 15, yAxisCellWidth = 50;
