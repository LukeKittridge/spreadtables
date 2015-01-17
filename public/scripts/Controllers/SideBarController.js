/**
 * Created by Luke on 19/12/2014.
 */

var SideBarController = (function(){
   var sideBarController = {};

    sideBarController.addElement = function(tableId){
        SideBarView.addElement(tableId);
    };

    sideBarController.handleClick = function(event){
        SideBarView.openTable(event);
    }
    return sideBarController;
}());