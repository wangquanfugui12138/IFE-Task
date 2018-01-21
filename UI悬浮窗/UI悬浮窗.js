/**
 * Created by admin on 2017/12/21.
 */
var X=0;
var Y=0;
var _top = 0;
var _left = 0;
var flag=false;
var pop=document.getElementById("pop")

function PopUp(){
    pop.style.top="35%";
    pop.style.left="35%";
    pop.style.display="block";
    document.getElementById("mu").style.display="block";
}

document.getElementById("mu").onclick=function() {
    var e = event || window.event;

    if (e.srcElement) {
        var aim = e.srcElement;
        if (aim != pop) {
            pop.style.display = "none";
            document.getElementById("mu").style.display = "none";
        }
    }
}

function close(){
    pop.style.display = "none";
    document.getElementById("mu").style.display = "none";
}

document.onmousemove = function (event) {
    var e = event || window.event;
    if (flag) {
        var nowX = e.clientX-X;
        var nowY = e.clientY-Y;
        if(_left + nowX>=0&&_left + nowX<=(document.documentElement.clientWidth-pop.offsetWidth))
            pop.style.left = _left + nowX + "px";
        if(_left + nowX<0)
            pop.style.left=0+"px";
        if(_left + nowX>(document.documentElement.clientWidth-pop.offsetWidth))
            pop.style.left=document.documentElement.clientWidth-pop.offsetWidth+"px";
        if(_top + nowY>=0&&_top + nowY<=(document.documentElement.clientHeight-pop.offsetHeight))
            pop.style.top = _top + nowY + "px";
        if(_top + nowY<0)
            pop.style.top=0+"px";
        if(_top + nowY>(document.documentElement.clientHeight-pop.offsetHeight))
            pop.style.top=document.documentElement.clientHeight-pop.offsetHeight+"px";
    }
}
document.getElementById("bar").onmousedown = function (event) {
    var e = event || window.event;
    e.preventDefault();
    flag = true;
    X = e.clientX;
    Y = e.clientY;
    _left = pop.offsetLeft;
    _top = pop.offsetTop;
}
document.onmouseup = function () {
    flag=false;
}


document.body.oncontextmenu=function(){
    var menu = document.getElementById("mymenu");
    menu.style.display = "block";
    menu.style.left = event.clientX+"px";
    menu.style.top = event.clientY+"px";

    return false;
}

document.onclick = function(){
    var menu = document.getElementById("mymenu");
    menu.style.display = "none";
}

