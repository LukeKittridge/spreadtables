/**
 * Created by Luke Kittridge on 27/10/2014.
 */

var MenuBarView = (function(){
    var menuBarView = {};

    menuBarView.showCreateTableDialogue = function (){
        menuBarView.showOverlay(true);
        var addDialogue = document.getElementById('add-table-dialogue');
        addDialogue.style.visibility = 'visible';

        var atTableColumns = document.getElementById('at-table-columns');
        atTableColumns.value = 5;

        var atTableRows = document.getElementById('at-table-rows');
        atTableRows.value = 10;
    };

    menuBarView.setTableNameText = function (text) {
        document.getElementById('at-table-name').value = text;
    };

    menuBarView.hideCreateTableDialogue = function () {
        var addDialogue = document.getElementById('add-table-dialogue');
        addDialogue.style.visibility = 'hidden';
        menuBarView.showOverlay(false);
    };

    menuBarView.hideOpenSheetDialogue = function(){
        var openDialogue = document.getElementById('open-sheet-dialogue');
        openDialogue.style.visibility = 'hidden';
        menuBarView.showOverlay(false);
    };

    menuBarView.getAddTableName = function(){
        return document.getElementById('at-table-name').value;
    };

    menuBarView.getCreateSheetName = function(){
        return document.getElementById('cs-sheet-name').value;
    };

    menuBarView.getAddTableRows = function(){
      return document.getElementById('at-table-rows').value;
    };

    menuBarView.getAddTableColumns = function(){
      return document.getElementById('at-table-columns').value;
    };

    menuBarView.showOverlay = function(showOverlay){
        var overlay = document.getElementById('overlay');
        if(showOverlay)
            overlay.style.visibility = 'visible';
        else
            overlay.style.visibility = 'hidden';
    };

    return menuBarView;
}());
