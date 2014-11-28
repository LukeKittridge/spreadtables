/**
 * Created by Luke Kittridge on 28/11/2014.
 */

var SideBar = (function (){

    var sideBar = {};

    var docSideBar = document.getElementById('table-side-bar');

    sideBar.addElement = function (tableId){
        var sideBarElement = document.createElement('div');
        sideBarElement.className = "side-bar-element";
        sideBarElement.id = tableId + '_sideBarElement';
        sideBarElement.innerHTML = tableId;

        var elementPlus = document.createElement('div');
        elementPlus.className = 'side-bar-element-plus';
        elementPlus.innerHTML = "<i class=\'fa fa-plus\'></i>";
        elementPlus.id = docTable.id + '_element-plus';
        sideBarElement.appendChild(elementPlus);

        docSideBar.appendChild(sideBarElement);
    }

    sideBar.handleElementClick = function(e){
        var tableId = e.target.id.split('_')[0] == '' ? e.target.parentNode.parentNode.id.split('_')[0] : e.target.id.split('_')[0];
        var table = document.getElementById(tableId);
        var elementPlus = document.getElementById(tableId+'_element-plus');
        elementPlus.style.visibility = 'hidden';
        table.style.visibility = 'visible';
    }

    return sideBar;
}());