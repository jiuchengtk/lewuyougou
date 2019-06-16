// window.onload = function () {


/* 
 *   商品搜索功能的实现，跨域访问百度的数据
 */

var ul = document.getElementById("list");
let text1 = document.getElementById("text1");
let search = document.getElementsByClassName("search");
let input = document.getElementsByTagName("input");
text1.onkeyup = function () {
    if (this.value != '') {
        var script = document.createElement("script");
        script.src = 'http://suggestion.baidu.com/su?wd=' + this.value + '&cb=fn';
        // script.src = 'https://list.tmall.com/search_product.htm?q=' + this.value + '&=fn';
        document.body.appendChild(script);
        /*  script.style.margin = "2px 10px";
         script.style.color = "#333"; */
    } else {
        ul.style.display = "none";
    }
}

// 输入框的聚焦事件
text1.onfocus = function () {
    if (text1.value === "好宝贝，等你搜") {
        text1.value = "";
        text1.style.color = "#ccc";
        ul.style.display = "block";
        search.style.border = "1px solid red";
        text1.style.border = "2px solid red";
        text1.style.background = "red";
        input.style.border = "2px solid red";
    }
};

// 输入框的离焦事件
text1.onblur = function () {
    if (text1.value === "") {
        text1.value = "好宝贝，等你搜";
        text1.style.color = "#333";
        ul.style.display = "none";
    }
};

/*   document.click = function(e){
     var target = e.target;
     ul.style.display = "none";
  } */


function fn(data) {
    var html = "";
    var ul = document.getElementById("list");
    if (data.s.length) {
        ul.style.display = "block";
        for (var i = 0; i < data.s.length; i++) {
            //html += '<li><a target="_blank" href="http://www.baidu.com/s?wd=' + data.s[i] + '">' + data.s[i] + '</a></li>';
            html += '<li><a target="_blank" href="http://www.baidu.com/s?wd=' + data.s[i] + '">' + data.s[i] + '</a></li>';
            // html += '<li><a target="_blank" href="https://list.tmall.com/search_product.htm?q='+data.s[i]+'">'+ data.s[i] +'</a></li>';
            // list1.style.margin = "10px 10px";
        }
        ul.innerHTML = html;
    } else {
        ul.style.display = "none";
    }
}







/* 
 *   轮播图功能的实现，实现自动轮播
 */
var list1 = document.getElementById("list1");
var prev1 = document.getElementById("prev1");
var next1 = document.getElementById("next1");

function animate(offset) {
    var newLeft = parseInt(list1.style.left) + offset;
    list1.style.left = newLeft + 'px';

    // 箭头切换
    if (newLeft < -3500) {
        list1.style.left = -700 + 'px';
    }
    if (newLeft > -700) {
        list1.style.left = -3500 + 'px';
    }
}

prev1.onclick = function () {
    animate(700);
}
next1.onclick = function () {
    animate(-700);
}


var timer;

function play() {
    //将轮播图换成向右切换图片
    timer = setInterval(function () {
        next1.onclick();
    }, 500)
}
play();

var container = document.getElementById("main-banner-center");

function stop() {
    clearInterval(timer);
}
container.onmouseover = stop;
container.onmouseout = play;



var buttons1 = document.getElementById("buttons1").getElementsByTagName("span");
var index = 1;

function buttonsShow() {
    //清除之前的样式
    for (var i = 0; i < buttons1.length; i++) {
        if (buttons1[i].className == "on") {
            buttons1[i].className = "";
        }
    }
    buttons1[index - 1].className = "on";
}

prev1.onclick = function () {
    index -= 1;
    if (index < 1) {
        index = 5;
    }
    buttonsShow();
    animate(700);
}
next1.onclick = function () {
    // 对圆点进行判断
    index += 1;
    if (index > 5) {
        index = 1;
    }
    buttonsShow();
    animate(-700);
}


for (var i = 0; i < buttons1.length; i++) {
    (function (i) {
        buttons1[i].onclick = function () {
            var clickIndex = parseInt(this.getAttribute("index"));
            var offset = 700 * (index - clickIndex);
            animate(offset);
            index = clickIndex;
            buttonsShow();
        }
    })(i)
}







/* 
 *   限时抢购功能的实现
 */

function FreshTime() {
    var endtime = new Date("2019/6/26,16:26:5"); //结束时间
    var nowtime = new Date(); //当前时间
    var lefttime = parseInt((endtime.getTime() - nowtime.getTime()) / 1000);
    d = parseInt(lefttime / 3600 / 24);
    h = parseInt((lefttime / 3600) % 24);
    m = parseInt((lefttime / 60) % 60);
    s = parseInt(lefttime % 60);

    document.getElementById("leftTime").innerHTML = d + "天" + h + "小时" + m + "分" + s + "秒";
    if (lefttime <= 0) {
        document.getElementById("leftTime").innerHTML = "团购已结束";
        document.getElementById("leftTime").style.color = "orange";
        document.getElementById("leftTime").style.fontSize = "21px";
        clearInterval(sh);
    }
}
FreshTime();
var sh;
sh = setInterval(FreshTime, 1000);




/* 
 *  分享的功能实现
 */
/* var d1 = document.getElementById("share1");
  //  鼠标移入到元素
   d1.onmouseover = function(){
       this.style.left = 0;
   };
   //  鼠标移出元素
   d1.onmouseout = function(){
     this.style.left = "-100px";
   };
 */



/* 
 *  返回顶部的功能
 */
// 获取元素
/* var top = document.getElementById("returnTop");
var leader = 0,
    target = 0,
    timer = 0;

window.onscroll = function () {
    scroll().top > 0 ? show(top) : hide(top);
    leader = scroll().top;
};

top.onclick = function () {
    target = 0;
    timmer = setInterval(function () {

        leader = leader + (target - leader) / 10;

        window.scrollTo(0, leader);
        console.log(leader);
        if (leader === target) {
            clearInterval(timer);
        }
    }, 10);
};
 */




/* 
 *  选项卡功能的实现
 */

var tabTop = document.getElementById("main-tabTop");
var tabLi1 = tabTop.getElementsByTagName("li");

var tabBottom = document.getElementById("main-tabBottom");
var tabLi2 = tabBottom.getElementsByClassName("tab");

for (var i = 0; i < tabLi1.length; i++) {
    tabLi1[i].index = i;
   
    tabLi1[i].onmousemove = function() { 
         
        for (var i = 0; i < tabLi1.length; i++) {
            tabLi1[i].className = '';
            tabLi2[i].style.display = "none";
        }
        this.className = 'act';
        tabLi2[this.index].style.display = "block";
    }
    for (var m = 1; m < tabLi1.length; m++) {
        tabLi1[m].className = '';
        tabLi2[m].style.display = "none";
    }
}














// }