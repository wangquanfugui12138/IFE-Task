/**
 * Created by admin on 2017/12/21.
 */
var ua=document.getElementsByClassName("uparrow");
var da=document.getElementsByClassName("downarrow");

function Asc(a, b) {
    return a.innerText - b.innerText;
}

function Desc(a, b) {
    return b.innerText - a.innerText;
}

//插入
function inner(rowsArr,colsArr ){
    var rowsTem = [];
    for(var i = 0; i< rowsArr.length;i++){
        var colsTem = [];//列的集合必须在遍历函数内部
        for(var j=0;j< colsArr.length;j++){
            colsTem[j] = colsArr[i].parentNode.cells[j].innerHTML;
        }
        rowsTem[i] = colsTem;
    }

    //插入页面
    for(var i = 0; i<rowsArr.length;i++){
        for(var j = 0; j <colsArr.length ; j++){
            rowsArr[i].cells[j].innerHTML = rowsTem[i][j];
        }
    }
}

//获取行列
function get(colNum,parentNode,AorD){
    var tbody = document.getElementsByTagName("tbody")[0];
    var colsArr = [];
    var rowsArr = [];
    //把表格中的行和列取出
    for(var n = 0; n< tbody.rows.length;n++){
        rowsArr[n] = tbody.rows[n];
        colsArr[n] = rowsArr[n].cells[colNum];
    }
    switch (parentNode.id){
        case "chinese":
            colsArr.sort(AorD);
            inner(rowsArr,colsArr);
            break;
        case "math":
            colsArr.sort(AorD);
            inner(rowsArr,colsArr);
            break;
        case "english":
            colsArr.sort(AorD);
            inner(rowsArr,colsArr);
            break;
        case "total":
            colsArr.sort(AorD);
            inner(rowsArr,colsArr);
            break;
    }
}

for (var i = 0; i < ua.length; i++) {
    (function(i) {
        ua[i].onclick = function() {
            var p= this.parentNode;
            get(p.cellIndex,p,Asc);
        }
        da[i].onclick = function() {
            var p= this.parentNode;
            get(p.cellIndex,p,Desc);
        }
    })(i);
}
