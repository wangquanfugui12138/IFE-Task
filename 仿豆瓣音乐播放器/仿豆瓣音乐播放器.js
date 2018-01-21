/**
 * Created by admin on 2017/12/28.
 */
var song={
    name:["背叛","淘汰","残酷月光"],
    singer:["曹格","陈奕迅","林宥嘉"],
    song_src:["http://music.163.com/song/media/outer/url?id=28921897.mp3",
        "http://music.163.com/song/media/outer/url?id=472006515.mp3",
        "http://music.163.com/song/media/outer/url?id=28921897.mp3"],
    img_src:["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493107986&di=d164cefb9595830f337bfe08ca37e5b5&imgtype=jpg&er=1&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fc%2F57e0d340722c4.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1468494108968&di=15feaf4374afd677390f584ec926762c&imgtype=jpg&src=http%3A%2F%2Fimg2.3lian.com%2F2014%2Ff6%2F198%2Fd%2F71.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1472224923997&di=4bd333099d4c402845df021759a58351&imgtype=jpg&src=http%3A%2F%2Ftimgsa.baidu.com%2Ftimg%3Fimage%26quality%3D80%26size%3Db10000_10000%26sec%3D1472214586%26di%3Da22471d20cfbf5e1c161fc9c831dddab%26src%3Dhttp%3A%2F%2Fi.zeze.com%2Fattachment%2Fforum%2F201607%2F30%2F204953dr2bj4cbjx2w3222.jpg"],
    liked:["n","n","n"]
};

var song_index=0;

window.onload=function () {
    for(var i=0;i<song.name.length-1;i++) {
        if (document.getElementById("song").innerText == song.name[i]) {
            song_index = i;
        }
    }
    document.getElementById("song").innerText = song.name[song_index];
    document.getElementById("singer").innerText=song.singer[song_index];
    document.getElementsByTagName("audio")[0].src=song.song_src[song_index];
    document.getElementsByTagName("img")[0].src=song.img_src[song_index];
    document.getElementById("bg").style.backgroundImage="url("+song.img_src[song_index]+")";
    isliked(song_index);
    document.getElementById("bg").style.backgroundImage="url("+song.img_src[song_index]+")";
};

function progress_control(){
    document.getElementsByClassName("pro_bar")[0].style.width=
        document.getElementsByTagName("audio")[0].currentTime/document.getElementsByTagName("audio")[0].duration*100+"%";
    document.getElementsByClassName("pro_circle")[0].style.left=
        document.getElementsByTagName("audio")[0].currentTime/document.getElementsByTagName("audio")[0].duration*100+"%"
}

function isliked(index){
    if(song.liked[index]=="n"){
        document.getElementById("like").classList.remove("fa-star");
        document.getElementById("like").classList.add("fa-star-half-empty");
        document.getElementById("like").style.color="silver";
    }
    else if(song.liked[index]=="y"){
        document.getElementById("like").classList.remove("fa-star-half-empty");
        document.getElementById("like").classList.add("fa-star");
        document.getElementById("like").style.color="#ff6e6f";
    }
}

function isStart(obj){
    if(obj.classList[1]=="fa-play"){
        obj.classList.remove("fa-play");
        obj.classList.add("fa-pause");
        document.getElementsByTagName("audio")[0].play();
        document.getElementsByTagName("img")[0].style.animationPlayState="running";
    }
    else{
        obj.classList.remove("fa-pause");
        obj.classList.add("fa-play");
        document.getElementsByTagName("audio")[0].pause();
        document.getElementsByTagName("img")[0].style.animationPlayState="paused";
    }
}

document.getElementById("start").onclick= function () {
    isStart(this);
};

document.getElementById("reload").onclick= function () {
    document.getElementsByTagName("audio")[0].currentTime=0;
    if(document.getElementById("start").classList[1]=="fa-play"){
        document.getElementById("start").classList.remove("fa-play");
        document.getElementById("start").classList.add("fa-pause");
        document.getElementsByTagName("audio")[0].play();
    }
};
function getLeft(el){
    var offsetLeft=el.offsetLeft;
    while (el.offsetParent) {
        el=el.offsetParent;
        offsetLeft+=el.offsetLeft;
    }
    return offsetLeft
}


document.getElementsByClassName("sound_bg")[0].onclick=function(event) {
    var e = event || window.event;

    document.getElementsByClassName("sound_bar")[0].style.width =
        ((e.pageX - getLeft(document.getElementsByClassName("sound_bg")[0])) /
        document.getElementsByClassName("sound_bg")[0].offsetWidth) * 100 + "%";
    document.getElementsByTagName("audio")[0].volume =
        ((e.pageX - getLeft(document.getElementsByClassName("sound_bg")[0])) /
        document.getElementsByClassName("sound_bg")[0].offsetWidth);
    if (((e.pageX - getLeft(document.getElementsByClassName("sound_bg")[0])) /
        document.getElementsByClassName("sound_bg")[0].offsetWidth) * 100 >= 50) {
        document.getElementById("volume").classList.remove("fa-volume-off");
        document.getElementById("volume").classList.remove("fa-volume-down");
        document.getElementById("volume").classList.add("fa-volume-up");
    }
    else if (((e.pageX - getLeft(document.getElementsByClassName("sound_bg")[0])) /
        document.getElementsByClassName("sound_bg")[0].offsetWidth) * 100 == 0) {
        document.getElementById("volume").classList.remove("fa-volume-down");
        document.getElementById("volume").classList.remove("fa-volume-up");
        document.getElementById("volume").classList.add("fa-volume-off");
    }
    else{
        document.getElementById("volume").classList.remove("fa-volume-off");
        document.getElementById("volume").classList.remove("fa-volume-up");
        document.getElementById("volume").classList.add("fa-volume-down");
    }
};


document.getElementsByTagName("audio")[0].oncanplaythrough= function () {
    document.getElementById("end_time").innerText=get_time(this.duration);
};

document.getElementsByTagName("audio")[0].ontimeupdate= function () {
    document.getElementById("cur_time").innerText=get_time(this.currentTime);
    document.getElementsByClassName("pro_bar")[0].style.display="block";

    progress_control();
};

function get_time (time) {
    if (typeof time!='number')
        return;

    var min=parseInt(time/60);
    var sec=parseInt(time%60);
    min=min<10?'0'+min:min;
    sec=sec<10?'0'+sec:sec;
    return min+':'+sec;
}

function setAudio(index){
    if(song.name[index]!=undefined){
        document.getElementById("song").innerText = song.name[index];
        document.getElementById("singer").innerText=song.singer[index];
        document.getElementsByTagName("audio")[0].src=song.song_src[index];
        document.getElementsByTagName("img")[0].src=song.img_src[index];
        document.getElementById("bg").style.backgroundImage="url("+song.img_src[index]+")";
        isliked(index);

        if(document.getElementById("start").classList[1]=="fa-play"){
            document.getElementById("start").classList.remove("fa-play");
            document.getElementById("start").classList.add("fa-pause");
            document.getElementsByTagName("audio")[0].play();
            document.getElementsByTagName("img")[0].style.animationPlayState="running";
        }
        else{
            document.getElementsByTagName("audio")[0].play();
            document.getElementsByTagName("img")[0].style.animationPlayState="running";
        }
    }
    else{
        document.getElementById("song").innerText = "已无更多歌曲";
        document.getElementById("singer").innerText="无";
        document.getElementById("end_time").innerText="00:00";
        document.getElementsByTagName("audio")[0].src=undefined;
        document.getElementsByTagName("img")[0].src=undefined;
        document.getElementById("bg").style.backgroundImage="url("+undefined+")";
        document.getElementById("like").classList.remove("fa-star");
        document.getElementById("like").classList.add("fa-star-half-empty");
        document.getElementById("like").style.color="silver";

        if(document.getElementById("start").classList[1]=="fa-pause"){
            document.getElementById("start").classList.remove("fa-pause");
            document.getElementById("start").classList.add("fa-play");
            document.getElementsByTagName("img")[0].style.animationPlayState="paused";
        }
        else{
            document.getElementsByTagName("img")[0].style.animationPlayState="paused";
        }
    }
}

function isEnd() {
    if (song_index < song.name.length - 1) {
        setAudio(song_index + 1);

        song_index += 1;
    }
    else {
        song_index = 0;

        setAudio(song_index);
    }
}

function isTop() {
    if (song_index > 0) {
        setAudio(song_index - 1);

        song_index -= 1;
    }
    else {
        song_index = song.name.length - 1;

        setAudio(song_index);
    }
}

document.getElementsByClassName("fa-step-forward")[0].onclick= function () {
    isEnd();
};

document.getElementsByClassName("fa-step-backward")[0].onclick= function () {
    isTop();
};

document.getElementById("like").onclick= function () {
    if(this.classList[1]=="fa-star-half-empty"){
        this.classList.remove("fa-star-half-empty");
        this.classList.add("fa-star");
        document.getElementById("like").style.color="#ff6e6f";
        song.liked[song_index]="y";
    }
    else{
        this.classList.remove("fa-star");
        this.classList.add("fa-star-half-empty");
        document.getElementById("like").style.color="silver";
        song.liked[song_index]="n";
    }
};

document.getElementById("delete").onclick= function () {
    song.name.splice(song_index, 1);
    song.song_src.splice(song_index, 1);
    song.singer.splice(song_index, 1);
    song.img_src.splice(song_index, 1);
    song.liked.splice(song_index, 1);
    isEnd();

    document.getElementById("start").classList.remove("fa-pause");
    document.getElementById("start").classList.add("fa-play");
    document.getElementsByTagName("audio")[0].pause();
    document.getElementsByTagName("img")[0].style.animationPlayState = "paused";
};

document.getElementsByClassName("pro_bg")[0].onclick= function (ev) {
    var e=ev||window.event;
    e.preventDefault();
    var X= e.pageX;
    var left= document.getElementsByClassName("left")[0].offsetLeft;
    document.getElementsByClassName("pro_bar")[0].style.width = X - left + "px";
    document.getElementsByClassName("pro_circle")[0].style.left = X - left + "px";
    document.getElementsByTagName("audio")[0].currentTime = document.getElementsByTagName("audio")[0].duration *
        (document.getElementsByClassName("pro_bar")[0].offsetWidth /
        document.getElementsByClassName("pro_bg")[0].offsetWidth);

    document.getElementsByClassName("pro_bar")[0].style.display = "block";
    document.getElementsByClassName("pro_bar")[0].style.display = "block";
};

document.getElementsByClassName("pro_circle")[0].onmousedown= function (ev) {
    var e=ev||window.event;
    e.preventDefault();
    var X= e.pageX;
    var left= document.getElementsByClassName("pro_circle")[0].offsetLeft;
    document.onmousemove=function(ev){
        var e=ev||window.event;
        var reX=e.pageX-X;
        if(reX+left<=document.getElementsByClassName("pro_bg")[0].offsetWidth){
            document.getElementsByClassName("pro_bar")[0].style.width= reX+left +"px";
            document.getElementsByClassName("pro_circle")[0].style.left= reX+left +"px";
            document.getElementsByTagName("audio")[0].currentTime= document.getElementsByTagName("audio")[0].duration*
                (document.getElementsByClassName("pro_bar")[0].offsetWidth/
                document.getElementsByClassName("pro_bg")[0].offsetWidth);
        }
        document.getElementsByClassName("pro_bar")[0].style.display="block";
        document.getElementsByClassName("pro_bar")[0].style.display="block";
    };
    document.onmouseup= function () {
        this.onmousemove= function () {
            void(0);
        }
    }
};

document.getElementsByClassName("pro_bg")[0].onmouseover= function () {
    document.getElementsByClassName("pro_circle")[0].style.display="block";
    document.getElementsByClassName("pro_bg")[0].onmouseout= function () {
        document.getElementsByClassName("pro_circle")[0].style.display="none";
    }
};

document.getElementById("type").onclick= function () {
    if(this.classList[1]=="fa-random"){
        this.classList.remove("fa-random");
        this.classList.add("fa-list-ol");
        this.title="顺序播放";
    }
    else if(this.classList[1]=="fa-list-ol"){
        this.classList.remove("fa-list-ol");
        this.classList.add("fa-circle-o-notch");
        this.title="单曲循环";
    }
    else if(this.classList[1]=="fa-circle-o-notch"){
        this.classList.remove("fa-circle-o-notch");
        this.classList.add("fa-random");
        this.title="随机播放";
    }
};

document.getElementsByTagName("audio")[0].onended= function () {
    if(document.getElementById("type").classList[1]=="fa-random"){
        var rd =Math.floor(Math.random()*song.name.length);
        setAudio(rd);
        song_index=rd;
    }
    else if(document.getElementById("type").classList[1]=="fa-list-ol"){
        isEnd();
    }
    else{
        setAudio(song_index);
    }
};