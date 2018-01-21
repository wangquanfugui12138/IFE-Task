/**
 * Created by admin on 2017/12/26.
 */

var re_h1 = /(\#){1}(\S*)/g;//h1
var re_h2 = /(\#){2}(\S*)/g;//h2
var re_h3 = /(\#){3}(\S*)/g;//h3
var re_h4 = /(\#){4}(\S*)/g;//h4
var re_h5 = /(\#){5}(\S*)/g;//h5
var re_h6 = /(\#){6}(\S*)/g;//h6
var re_pic = /\!\[(.*?)\]\((.*?)\)/gi;//picture
var re_link = /\[(.*?)\]\((.*?)\)/gi;//link
var re_list = /(\*\s){1}(\S*)/g;//ul
var re_code = /(\`){3}([\s\S]*?)(\`){3}/g;//code
var output=document.getElementsByClassName("output")[0];
var input=document.getElementById("txt");

input.oninput=function(){
    output.innerHTML=input.value.replace(re_h6,"<h6>$2</h6>");
    output.innerHTML = output.innerHTML.replace(re_h5,"<h5>$2</h5>");
    output.innerHTML = output.innerHTML.replace(re_h4,"<h4>$2</h4>");
    output.innerHTML = output.innerHTML.replace(re_h3,"<h3>$2</h3>");
    output.innerHTML = output.innerHTML.replace(re_h2,"<h2>$2</h2>");
    output.innerHTML = output.innerHTML.replace(re_h1,"<h1>$2</h1>");
    output.innerHTML = output.innerHTML.replace(re_list,"<li>$2</li>");
    output.innerHTML = output.innerHTML.replace(re_pic,'<img src="$2" alt="$1">');
    output.innerHTML = output.innerHTML.replace(re_link,'<a href="$2">$1</a>');
    output.innerHTML = output.innerHTML.replace(re_code,"<pre><code>$2</code></pre>");
}
