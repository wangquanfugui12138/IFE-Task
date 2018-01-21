/**
 * Created by admin on 2017/12/25.
 */
document.getElementById("match_p").onclick=function(){
    if(document.getElementById("phone").value!=""){
        var regex= /^1([3|5|7|8]{1}[0-9]{1}|47)\d{8}/;
        if(document.getElementById("phone").value.match(regex)){
            alert("匹配成功");
        }
        else{
            alert("输入有误");
        }
    }
}
document.getElementById("match_t").onclick=function(){
    if(document.getElementById("txt").value!=""){
        var str=document.getElementById("txt").value;
        var index=[];
        for(var i=0;i<str.split(" ").length;i++) {
            var patt = new RegExp(str.split(" ")[i], "g");
            for(var j=0;j<str.split(" ").length;j++){
                patt.exec(str);
                index[j]=patt.lastIndex;
            }
            if(index.length>1){
                for(var n=0;n<index.length;n++){
                    if(index[n+1]-index[n]-str.split(" ")[i].length==1){
                        alert(str.split(" ")[i]);
                        return false;
                    }
                }
            }
        }
    }
}