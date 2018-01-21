/**
 * Created by admin on 2017/12/15.
 */
window.onload= function () {
    choose();
    AddToUn();
}

function choose() {
    var radio=document.getElementsByName("type");
    for(var i=0;i<radio.length;i++) {
        if (radio[i].checked && radio[i].value == "stu") {
            document.getElementById("unsc").style.display = "none";
            document.getElementById("sc").style.display = "block";
        }
        else if (radio[i].checked && radio[i].value == "unstu") {
            document.getElementById("sc").style.display = "none";
            document.getElementById("unsc").style.display = "block";
        }
    }
}
function AddToUn(){
    var add=document.getElementsByTagName('option');
    for(var i=0;i<add.length;i++){
        if (add[i].selected && add[i].id == "a1") {
            document.getElementById("bjsn").style.display="inline-block";
            document.getElementById("shsn").style.display="none";
            document.getElementById("sdsn").style.display="none";
        }
        else if (add[i].selected && add[i].id == "a2") {
            document.getElementById("bjsn").style.display="none";
            document.getElementById("shsn").style.display="inline-block";
            document.getElementById("sdsn").style.display="none";
        }
        else if (add[i].selected && add[i].id == "a3") {
            document.getElementById("bjsn").style.display="none";
            document.getElementById("shsn").style.display="none";
            document.getElementById("sdsn").style.display="inline-block";
        }
    }
}