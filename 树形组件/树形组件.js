/**
 * Created by admin on 2017/12/28.
 */
var span= document.getElementsByTagName("span");

for(var i=0;i<span.length;i++){
    span[i].onclick=function(){
        if(this.innerText=="+"){
            for(var j=0;j<this.parentNode.children.length;j++){
                if(this.parentNode.children[j].tagName=="DIV")
                    this.parentNode.children[j].classList.remove("hide");
                if(j==this.parentNode.children.length-1)
                    this.innerText="-";
            }
        }
        else if(this.innerText=="-"){
            for(var k=0;k<this.parentNode.children.length;k++){
                if(this.parentNode.children[k].tagName=="DIV")
                    this.parentNode.children[k].classList.add("hide");
                if(k==this.parentNode.children.length-1)
                    this.innerText="+";
            }
        }
    }
}