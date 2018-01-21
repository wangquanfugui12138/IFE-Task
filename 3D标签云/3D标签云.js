var tagEle = $(".tag_cloud a"),
    tagWrap = $(".tag_cloud")[0],
    RADIUS = 200, //圆的半径
    focalLength = 600, //焦距  （Z轴上屏幕距离球的距离）
    tags = [],//保存标签对象
    speed=25,//转动的速度（值越小速度越快）
    angleX = Math.PI / 300,
    angleY = Math.PI / 300,
    CX = tagWrap.offsetWidth / 2,
    CY = tagWrap.offsetHeight / 2,
    EX = tagWrap.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft,
    EY = tagWrap.offsetTop + document.body.scrollTop + document.documentElement.scrollTop;
function init() {
    /*
     *  为每一个标签生成在球面上的x,y,z轴的坐标
     */
    for(var i = 0; i < tagEle.length; i++) {
        /*单纯的随机获取坐标会导致部分文字重叠
         * var a = Math.random()*2*Math.PI;
         * var b = Math.random()*2*Math.PI;
         */
        /*所以使用平均分布公式
         * θ = arccos( ((2*num)-1)/all - 1);  (num是当前第几个点，all则是点的总数)
         * Φ = θ*sqrt(all * π);
         */
        var k = -1 + (2 * (i + 1) - 1) / tagEle.length;
        var a = Math.acos(k);
        var b = a * Math.sqrt(tagEle.length * Math.PI);
        //生成球面上的点的x,y,z轴的坐标。用到的是球面方程
        var x = RADIUS * Math.sin(a) * Math.cos(b); //x=r*sinθ*cosΦ
        var y = RADIUS * Math.sin(a) * Math.sin(b); //y=r*sinθ*sinΦ
        var z = RADIUS * Math.cos(a); //z=r*cosθ

        var t = new tag(tagEle[i], x, y, z);
        //颜色只设置一次，避免每次调用move()时重新设置颜色
        tagEle[i].style.color = "rgb("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+")";
        tags.push(t); //保存
        t.move(); //为每个标签设置位置和样式
    }
}
var tag = function(ele, x, y, z) {
    this.ele = ele;
    this.x = x;
    this.y = y;
    this.z = z;
}
tag.prototype = {
    move: function() {
        var scale = focalLength / (focalLength - this.z);
        var alpha = (this.z + RADIUS) / (2 * RADIUS);
        $(this.ele).css({
            "font-size": 14 * scale + "px",
            "opacity": alpha + 0.5,
            "z-index": parseInt(scale * 100),
            "left": this.x + CX + "px",
            "top": this.y + CY + "px"
        });
    }
}

init();

/***********第二部分： 为标签绑定事件**************/

//绕X轴旋转
function rotateX() {
    var cos = Math.cos(angleX);
    var sin = Math.sin(angleX);
    tags.forEach(function() {
        var y1 = this.y * cos - this.z * sin;
        var z1 = this.z * cos + this.y * sin;
        this.y = y1;
        this.z = z1;
    })
}
//绕Y轴旋转
function rotateY() {
    var cos = Math.cos(angleY);
    var sin = Math.sin(angleY);
    tags.forEach(function() {
        var x1 = this.x * cos - this.z * sin;
        var z1 = this.z * cos + this.x * sin;
        this.x = x1;
        this.z = z1;
    })
}
//angleX和angleY两个角度的值来控制标签云的旋转方向以及旋转速度，角度的正负值控制旋转方向，大小控制旋转速度。
function bind() {
    $(".tag_cloud").bind("mousemove", function(e) {
        var x = e.clientX - EX - CX;
        var y = e.clientY - EY - CY;
        // angleY = -x* (Math.sqrt(Math.pow(x , 2) + Math.pow(y , 2)) > RADIUS/4 ? 0.0002 : 0.0001);
        // angleX = -y* (Math.sqrt(Math.pow(x , 2) + Math.pow(y , 2)) > RADIUS/4 ? 0.0002 : 0.0001);
        angleY = x *(speed /200000);
        angleX = y * (speed /200000);
    });
}
Array.prototype.forEach = function(callback) {
    for(var i = 0; i < this.length; i++) {
        callback.call(this[i]);
    }
}
function animate() {
    setInterval(function() {
        rotateX();
        rotateY();
        tags.forEach(function() {
            this.move();
        })
    }, speed)
}

bind();
animate();