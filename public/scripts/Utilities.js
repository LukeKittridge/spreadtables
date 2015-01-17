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
};


const cellWidth = 100, cellHeight = 22, titleBarHeight = 20, yAxisCellWidth = 50;

/**
 * Moves the text cursor the specified number of spaces.
 * Author Tim Down - http://stackoverflow.com/a/10782169
 * @param win - window
 * @param charCount - number of characters to move
 */
function moveCaret(win, charCount) {
    var sel, range;
    if (win.getSelection) {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var textNode = sel.focusNode;
            var newOffset = sel.focusOffset + charCount;
            sel.collapse(textNode, Math.min(textNode.length, newOffset));
        }
    } else if ( (sel = win.document.selection) ) {
        if (sel.type != "Control") {
            range = sel.createRange();
            range.move("character", charCount);
            range.select();
        }
    }
}