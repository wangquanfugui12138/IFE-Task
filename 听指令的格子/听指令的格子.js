/**
 * Created by admin on 2017/12/15.
 */
var block= document.getElementById("block");
var temp=0;

function GO(){
    var left = Number(block.offsetLeft);
    var top = Number(block.offsetTop);

    switch(temp%4){
        case -2:
            if(left>450){
                left-=50;
                block.style.left = left + 'px';
            }
            break;
        case -3:
            if(top<550){
                top+=50;
                block.style.top = top + 'px';
            }
            break;
        case -1:
            if(top>100){
                top-=50;
                block.style.top = top + 'px';
            }
            break;
       case 0:
           if(left<900){
               left+=50;
               block.style.left = left + 'px';
           }
           break;
       case 1:
           if(top<550){
               top+=50;
               block.style.top = top + 'px';
           }
           break;
       case 2:
           if(left>450){
               left-=50;
               block.style.left = left + 'px';
           }
           break;
       case 3:
           if(top>100){
               top-=50;
               block.style.top = top + 'px';
           }
           break;
   }
}

function RIG(){
    temp++;
    block.style.transform="rotate("+90*temp+"deg)";
}

function LEF(){
    temp--;
    block.style.transform="rotate("+90*temp+"deg)";
}