/**
 * Created by Luke Kittridge on 27/10/2014.
 */

function showCreateTableDialogue(){
    Application.setCurrentState(ApplicationStates.Menu);

    var addDialogue = document.getElementById('add-table-dialogue');
    addDialogue.style.visibility = 'visible';

    var atTableName = document.getElementById('at-table-name');
    atTableName.value = 'table' + (Table.tablesCreated +1);

    var atTableColumns = document.getElementById('at-table-columns');
    atTableColumns.value = 5;

    var atTableRows = document.getElementById('at-table-rows');
    atTableRows.value = 10;
}

function hideCreateTableDialogue(){
    applicationState = ApplicationStates.CellSelected

    var addDialogue = document.getElementById('add-table-dialogue');
    addDialogue.style.visibility = 'hidden';
}

function addTable(){
    var name = document.getElementById('at-table-name').value;
    var rows = document.getElementById('at-table-rows').value;
    var columns = document.getElementById('at-table-columns').value;
    Application.createTable(name,rows,columns);

    var addDialogue = document.getElementById('add-table-dialogue');
    addDialogue.style.visibility = 'hidden';
    applicationState = ApplicationStates.CellSelected;
}