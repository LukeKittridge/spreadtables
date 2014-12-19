/**
 * Created by Luke Kittridge on 27/10/2014.
 */

var MenuBarView = (function(){
    var menuBarView = {};

    menuBarView.showCreateTableDialogue = function (){
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
    };

    menuBarView.getAddTableName = function(){
        return document.getElementById('at-table-name').value;
    };

    menuBarView.getAddTableRows = function(){
      return document.getElementById('at-table-rows').value;
    };

    menuBarView.getAddTableColumns = function(){
      return document.getElementById('at-table-columns').value;
    };

    return menuBarView;
}());
