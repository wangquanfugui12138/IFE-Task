var tagEle = $(".tag_cloud a"),
    tagWrap = $(".tag_cloud")[0],
    RADIUS = 200, //Բ�İ뾶
    focalLength = 600, //����  ��Z������Ļ������ľ��룩
    tags = [],//�����ǩ����
    speed=25,//ת�����ٶȣ�ֵԽС�ٶ�Խ�죩
    angleX = Math.PI / 300,
    angleY = Math.PI / 300,
    CX = tagWrap.offsetWidth / 2,
    CY = tagWrap.offsetHeight / 2,
    EX = tagWrap.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft,
    EY = tagWrap.offsetTop + document.body.scrollTop + document.documentElement.scrollTop;
function init() {
    /*
     *  Ϊÿһ����ǩ�����������ϵ�x,y,z�������
     */
    for(var i = 0; i < tagEle.length; i++) {
        /*�����������ȡ����ᵼ�²��������ص�
         * var a = Math.random()*2*Math.PI;
         * var b = Math.random()*2*Math.PI;
         */
        /*����ʹ��ƽ���ֲ���ʽ
         * �� = arccos( ((2*num)-1)/all - 1);  (num�ǵ�ǰ�ڼ����㣬all���ǵ������)
         * �� = ��*sqrt(all * ��);
         */
        var k = -1 + (2 * (i + 1) - 1) / tagEle.length;
        var a = Math.acos(k);
        var b = a * Math.sqrt(tagEle.length * Math.PI);
        //���������ϵĵ��x,y,z������ꡣ�õ��������淽��
        var x = RADIUS * Math.sin(a) * Math.cos(b); //x=r*sin��*cos��
        var y = RADIUS * Math.sin(a) * Math.sin(b); //y=r*sin��*sin��
        var z = RADIUS * Math.cos(a); //z=r*cos��

        var t = new tag(tagEle[i], x, y, z);
        //��ɫֻ����һ�Σ�����ÿ�ε���move()ʱ����������ɫ
        tagEle[i].style.color = "rgb("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+")";
        tags.push(t); //����
        t.move(); //Ϊÿ����ǩ����λ�ú���ʽ
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

/***********�ڶ����֣� Ϊ��ǩ���¼�**************/

//��X����ת
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
//��Y����ת
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
//angleX��angleY�����Ƕȵ�ֵ�����Ʊ�ǩ�Ƶ���ת�����Լ���ת�ٶȣ��Ƕȵ�����ֵ������ת���򣬴�С������ת�ٶȡ�
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