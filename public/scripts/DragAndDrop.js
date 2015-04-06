/**
 * Created by Luke Kittridge on 26/10/2014.
 * Based on a tutorial by Luke Breuer
 * http://luke.breuer.com/tutorial/javascript-drag-and-drop-tutorial.aspx
 */

var _startX =0;
var _startY =0;

var _offsetX =0;
var _offsetY =0;
var _dragElement;
var _oldZIndex =0;


function onMouseDown(e){
    //IE support
    if(e == null)
        e = window.event;

    var target = e.target != null ? e.target : e.srcElement;

    if(target.parentNode != null && target.parentNode.classList != null && target.parentNode.classList.contains('drag')){
            target = target.parentNode;

    }
    else{
        return false;
    }

    //IE left click = 1
    //otherwise 0
    if((e.button ==1 && window.event != null || e.button ==0) && target.classList.contains('drag')){
        _startX = e.clientX;
        _startY = e.clientY;


        _offsetX = ExtractNumber(target.parentNode.style.left);
        _offsetY = ExtractNumber(target.parentNode.style.top);


        //bring clicked element to front
        _oldZIndex = target.style.zIndex;
        target.style.zIndex = 10000;

        _dragElement = target;

        document.onmousemove = onMouseMove;

        document.body.focus();

        //prevent text and image selection in IE
        document.onselectstart = function(){return false;};
        target.ondragstart = function() {return false;};

        return false;
    }
}

function onMouseMove(e)
{
    if(e == null)
         e = window.event;

    var left = _dragElement.parentNode.style.left = (_offsetX + e.clientX - _startX) + 'px';
    var top = _dragElement.parentNode.style.top = (_offsetY + e.clientY - _startY) + 'px';

    var tableName = _dragElement.parentNode.id;
    TableController.updateTablePosition(tableName,top,left);
    SyncController.updateTablePosition(tableName,top,left);
}

function onMouseUp(e)
{
    if(_dragElement != null)
    {
        _dragElement.style.zIndex = _oldZIndex;

        document.onmousemove = null;
        document.onselectstart = null;
        _dragElement.ondragstart = null;

        _dragElement = null;
    }
}

function onTouchStart(e){
    var target = e.target != null ? e.target : e.srcElement;

    if(target.parentNode != null && target.parentNode.classList != null && target.parentNode.classList.contains('drag')){
        target = target.parentNode;

    }
    else{
        return false;
    }

    var touch = event.targetTouches[0];
    _startX = touch.clientX;
    _startY = touch.clientY;


    _offsetX = ExtractNumber(target.parentNode.style.left);
    _offsetY = ExtractNumber(target.parentNode.style.top);

}

function onTouchMove(e){
    var target = e.target != null ? e.target : e.srcElement;

    if(target.parentNode != null && target.parentNode.classList != null && target.parentNode.classList.contains('drag')){
        target = target.parentNode;

    }
    else{
        return false;
    }

    var touch = event.targetTouches[0];
    var left = target.parentNode.style.left = (_offsetX + touch.clientX - _startX) + 'px';
    var top = target.parentNode.style.top = (_offsetY + touch.clientY - _startY) + 'px';
    event.preventDefault();

    var tableName = target.parentNode.id;
    TableController.updateTablePosition(tableName,top,left);
    SyncController.updateTablePosition(tableName,top,left);

}

function ExtractNumber(value){
    var n = parseInt(value);

    return n == null || isNaN(n) ? 0 : n;
}