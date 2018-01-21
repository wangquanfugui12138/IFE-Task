/**
 * Created by admin on 2017/12/27.
 */
var img=document.getElementsByTagName("img");

for(var i=0;i<img.length;i++) {
    img[i].onclick=function(){
        location.href="http://www.baidu.com";
    }
}