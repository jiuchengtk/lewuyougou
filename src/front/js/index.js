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
 *  用户状态判断  
 */

let usernameLo = localStorage.getItem("username");
let passwordLo = localStorage.getItem("password");

let userStatus = document.getElementById("userStatus");
let userLogout = document.getElementById("userLogout");

if (usernameLo !== null && passwordLo !== null) {

    userStatus.innerHTML = usernameLo + "已登录";
    userLogout.innerHTML = "点击注销";
    userLogout.style.color = "#27c0ab";

    userLogout.onclick = function () {

        confirm("确认要注销吗？");

        localStorage.removeItem("username");
        localStorage.removeItem("password");

        alert("注销成功！");
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
/* function play(){
    timer = setInterval(function(){
        prev1.onclick()
    },800)
} */
play();

var containerBc = document.getElementById("main-banner-center");

function stop() {
    clearInterval(timer);
}
containerBc.onmouseover = stop;
containerBc.onmouseout = play;



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
var i=0;
var Timer;

//轮播部分
function TimerBanner(){
    Timer = setInterval(function(){
        i++;
        if(i==5){
            i=0;
        }
        showPic()
    },1000);
}
//显示图片
function showPic(){
    $(".picImg").eq(i).show().siblings().hide();
    $(".tabs li").eq(i).addClass("bg").siblings().removeClass("bg");
}



$(function(){
    $(".picImg").eq(0).show().siblings().hide();   //默认第一张图片显示，其他的隐藏
    //自动轮播
    TimerBanner();

    //点击红圈

    $(".tabs li").hover(function(){  //鼠标移动上去
        clearInterval(Timer); //让计时器暂时停止   清除计时器
        i=$(this).index();   //获取该圈的索引
        showPic();           //调用显示图片的方法，显示该索引对应的图片
    },function(){  //鼠标离开
        TimerBanner();    //继续轮播   计时器开始
    });

    //点击左右按钮
    $(".btn1").click(function(){
        clearInterval(Timer);
        i--;   //往左
        if(i==-1){
            i=4;
        }
        showPic();
        TimerBanner();
    });
    $(".btn2").click(function(){
        clearInterval(Timer);
        i++;   //往右
        if(i==5){
            i=0;
        }
        showPic();
        TimerBanner();
    });
});

 */



/* $(function () {
    var $container = $('#main-banner-center')
    var $list = $('#list1')
    var $points = $('#pointsDiv>span')
    var $prev = $('#prev')
    var $next = $('#next')
    var TIME = 400 // 移动的总时间
    var ITEM_TIME = 20 //单元移动的间隔时间
    var PAGE_WIDTH = 700 // 一页的宽度
    var imgCount = $points.length //图片的数量
    var index = 0 //当前圆点的下标
    var moving = false //是否正在翻页中
  
  
    // 1. 点击向右(左)的图标, 平滑切换到下(上)一页
    $next.click(function () {
      nextPage(true)
    })
    $prev.click(function () {
      nextPage(false)
    })
  
    // 3. 每隔3s自动滑动到下一页
    var intervalId = setInterval(function () {
      nextPage(true)
    }, 1000)
  
    // 4. 当鼠标进入图片区域时, 自动切换停止, 当鼠标离开后,又开始自动切换
    $container.hover(function () {
      clearInterval(intervalId)
    }, function () {
      intervalId = setInterval(function () {
        nextPage(true)
      }, 1000)
    })
  
    // 6. 点击圆点图标切换到对应的页
    $points.click(function () {
      var targetIndex = $(this).index()
      if(targetIndex!=index) {
        nextPage(targetIndex)
      }
    })
  
    
    function nextPage (next) {
      
      // 如果正在翻页, 此次翻页请求不执行
      if(moving) {
        return
      }
      moving = true // 标识正在翻页中
  
      var offset = 0 //移动的总距离
      // 计算offset
      if(typeof next==='boolean') {
        offset = next ? -PAGE_WIDTH : PAGE_WIDTH
      } else {
        offset = -PAGE_WIDTH * (next - index)
      }
  
      // 计算单元移动的距离
      var itemOffset = offset/(TIME/ITEM_TIME)
      // 当前的left
      var currLeft = $list.position().left
      // 目标的left
      var targetLeft = currLeft + offset
      // 启动循环定时器不断移动, 到达目标位置时清除定时器
      var intervalId = setInterval(function () {
        // 计算当前要设置的left
        currLeft += itemOffset
        if(currLeft===targetLeft) {
          //清除定时器
          clearInterval(intervalId)
          //标识翻页完成
          moving = false
  
          // 如果滑动到了最左边的图片, 直接跳转到最右边的第2张图片
          if(currLeft===0) {
            currLeft = -PAGE_WIDTH * imgCount
          } else if(currLeft===-PAGE_WIDTH*(imgCount+1)) {
            // 如果滑动到了最右边的图片, 直接跳转到最左边的第2张图片
            currLeft = -PAGE_WIDTH
          }
        }
        // 更新$list的left样式
        $list.css({
          left: currLeft
        })
      }, ITEM_TIME)
  
      // 5. 切换页面时, 下面的圆点也同步更新
      updatePoints(next)
    }
  
  
    function updatePoints (next) {
      var targetIndex = 0
      // 计算目标下标
      if(typeof next==='boolean') {
        if(next) {
          targetIndex = index + 1
          if(targetIndex===imgCount) {
            targetIndex = 0
          }
        } else {
          targetIndex = index-1
          if(targetIndex===-1) {
            targetIndex = imgCount-1
          }
        }
      } else {
        targetIndex = next
      }
      // 移除当前下标元素的class
      $points[index].className = ''
      // 给目标下标的元素指定class
      $points[targetIndex].className = 'on'
      //更新当前下标
      index = targetIndex
    }
  }) */



/* 
  carousel(
    //必选， 要轮播模块(id/class/tagname均可)，必须为jQuery元素
    $(".demo1"),
    {
        //可选，默认左右(leftright) - 'leftright' / 'updown' / 'fade' (左右/上下/渐隐渐现)
        type:"leftright",
        //可选，默认一直显示 - 'move' / 'none'   (鼠标移上显示 / 不显示 )
        arrowtype:"move",
        //可选，默认true - true / false (开启轮播/关闭轮播)
        autoplay:true,
        //可选，默认3000
        time:3000
    }
);
 */

/* 
 *  jQuery 实现轮播图的封装
 */
/* (function(window, factory){

    var carousel = function(carouselWrap, parameter){
        return new carousel.fn.init(carouselWrap , parameter);
    }
    carousel.fn = carousel.prototype = {
        constructor: carousel,
        ind: 0,
        prev: function(parameter, pb_carousel, pb_carousel_ind, len){
            if(parameter.type == 'fade'){
                pb_carousel.eq(this.ind).fadeOut(300);
                if(this.ind == 0) pb_carousel.eq(len - 1).fadeIn(300);
                else pb_carousel.eq(this.ind).prev().fadeIn(300);
                this.ind--;
                if(this.ind < 0) this.ind=len-1;
                this.carousel_ind(pb_carousel_ind);
            }else if(parameter.type == 'updown'){
                pb_carousel.eq(this.ind).animate({'top': "100%"},300);
                if(this.ind == 0) pb_carousel.eq(len - 1).css('top', '-100%').show().animate({'top':0},300);
                else pb_carousel.eq(this.ind).prev().css('top', '-100%').show().animate({'top':0},300);
                this.ind--;
                if(this.ind < 0) this.ind=len-1;
                this.carousel_ind(pb_carousel_ind);
            }else if(parameter.type == 'leftright' || parameter.type == undefined){
                pb_carousel.eq(this.ind).animate({'left': "100%"},300);
                if(this.ind == 0) pb_carousel.eq(len - 1).css('left', '-100%').show().animate({'left':0},300);
                else pb_carousel.eq(this.ind).prev().css('left', '-100%').show().animate({'left':0},300);
                this.ind--;
                if(this.ind < 0) this.ind=len-1;
                this.carousel_ind(pb_carousel_ind);
            }
        },
        next: function(parameter, pb_carousel, pb_carousel_ind, len){
            if(parameter.type == 'fade'){
                pb_carousel.eq(this.ind).fadeOut(300);
                if(this.ind == len-1) pb_carousel.eq(0).fadeIn(300);
                pb_carousel.eq(this.ind).next().fadeIn(300);
                this.ind++;
                if(this.ind > len-1) this.ind = 0;
                this.carousel_ind(pb_carousel_ind);
            }else if(parameter.type == 'updown'){
                pb_carousel.eq(this.ind).animate({'top': "-100%"},300);
                if(this.ind == len-1) pb_carousel.eq(0).css('top', '100%').show().animate({'top':0},300);
                pb_carousel.eq(this.ind).next().css('top', '100%').show().animate({'top':0},300);
                this.ind++;
                if(this.ind > len-1) this.ind = 0;
                this.carousel_ind(pb_carousel_ind);
            }else if(parameter.type == 'leftright' || parameter.type == undefined){
                pb_carousel.eq(this.ind).animate({'left': "-100%"},300);
                if(this.ind == len-1) pb_carousel.eq(0).css('left', '100%').show().animate({'left':0},300);
                pb_carousel.eq(this.ind).next().css('left', '100%').show().animate({'left':0},300);
                this.ind++;
                if(this.ind > len-1) this.ind = 0;
                this.carousel_ind(pb_carousel_ind);
            }
        },
        carousel_ind: function(pb_carousel_ind){
            pb_carousel_ind.each(function(){
                $(this).removeClass('pb-this');
            })
            pb_carousel_ind.eq(this.ind).addClass('pb-this');
        },
        click: function(carouselWrap, parameter){
            var _this = this,
                len = carouselWrap.children('.pb-carousel').children().length,
                pb_carousel = carouselWrap.children('.pb-carousel').children(),
                pb_carousel_ind = carouselWrap.children('.pb-carousel-ind').children();
            carouselWrap.children('.pb-arrow-prev').click(function(){
                _this.prev(parameter, pb_carousel, pb_carousel_ind, len);
            });
            carouselWrap.children('.pb-arrow-next').click(function(){
                _this.next(parameter, pb_carousel, pb_carousel_ind, len);
            });
            pb_carousel_ind.click(function(){
                if($(this).index() != _this.ind){
                    if(parameter.type == 'fade'){
                        pb_carousel.eq(_this.ind).fadeOut(300);
                        _this.ind = $(this).index();
                        pb_carousel.eq(_this.ind).fadeIn(300);
                    }else if(parameter.type == 'updown'){
                        pb_carousel.eq(_this.ind).animate({'top': "-100%"},300);
                        _this.ind = $(this).index();
                        pb_carousel.eq(_this.ind).css('top', '100%').show().animate({'top':0},300);
                    }else if(parameter.type == 'leftright' || parameter.type == undefined){
                        pb_carousel.eq(_this.ind).animate({'left': "-100%"},300);
                        _this.ind = $(this).index();
                        pb_carousel.eq(_this.ind).css('left', '100%').show().animate({'left':0},300);
                    }
                }
                _this.carousel_ind(pb_carousel_ind);
            })
        },
        autoPlay: function(carouselWrap, parameter){    
            var _this = this,
                time = parameter.time || 3000,
                len = carouselWrap.children('.pb-carousel').children().length,
                pb_carousel = carouselWrap.children('.pb-carousel').children(),
                pb_carousel_ind = carouselWrap.children('.pb-carousel-ind').children(),
                timer = setInterval(function(){
                    _this.next(parameter, pb_carousel, pb_carousel_ind, len);
            }, time);
            carouselWrap.on('mouseover', function(){
                clearInterval(timer)
            });
            carouselWrap.on('mouseout', function(){
                timer = setInterval(function(){
                    _this.next(parameter, pb_carousel, pb_carousel_ind, len);
                }, time);
            });
        },
        arrow: function(carouselWrap, parameter){
            if(parameter.arrowtype == 'move'){
                carouselWrap.on('mouseenter', function(){
                    $(this).children('.pb-arrow-prev').fadeIn();
                });
                carouselWrap.on('mouseleave', function(){
                    $(this).children('.pb-arrow-prev').fadeOut();
                });
                carouselWrap.on('mouseenter', function(){
                    $(this).children('.pb-arrow-next').fadeIn();
                });
                carouselWrap.on('mouseleave', function(){
                    $(this).children('.pb-arrow-next').fadeOut();
                });
            }else if(parameter.arrowtype == 'none'){
                carouselWrap.children('.pb-arrow-prev').hide();
                carouselWrap.children('.pb-arrow-next').hide();
            }
        },
        init: function(carouselWrap , parameter){
            this.carouselWrap = carouselWrap;
            this.parameter = parameter;
            if(this.parameter.type == 'updown') this.carouselWrap.attr('type','updown');
            this.arrow(this.carouselWrap, this.parameter);
            var autoplay = (typeof this.parameter.autoplay === 'boolean') ? this.parameter.autoplay : true;
            this.click(this.carouselWrap, this.parameter);
            if(autoplay) this.autoPlay(this.carouselWrap, this.parameter);
        }
    }
    carousel.fn.init.prototype = carousel.fn;
    window.carousel = carousel;
}(typeof window !== 'undefined' ? window : this ,jQuery)); */

















/* 
 *   限时抢购功能的实现
 */

function FreshTime() {
    var endtime = new Date("2019/6/28,16:26:5"); //结束时间
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

    tabLi1[i].onmousemove = function () {

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





/* 
 *  图片懒加载功能的实现
 */

// 获取元素
/* var imgLoad = document.querySelectorAll("img");
var lenLoad = img.length;
// 存储图片的加载位置
var nLoad = 0;

// 获取图片的可视区域
var heightLoad = document.documentElement.clientHeight;
var topLoad = document.body.scrollTop || document.documentElement.scrollTop;
for(var i=nLoad;i<lenLoad;i++){
    if(imgLoad[i].offsetTop< heightLoad + top){
        if(imgLoad[i].getAttribute("src")==""){
            imgLoad[i].src = imgLoad[i].getAttribute("data-src");
        }
        nLoad = i + 1;
        console.log("第"+nLoad+"张图片"+",n="+nLoad);
    }
} *





/* 
*  超级单品秒杀模块  请求json 数据
*/


let dataJson = goods.msg;
let mainRush = document.getElementById("main-rush");
let mainRushUl = document.getElementById("main-rushUl");

let itemId = dataJson["goods_id"];
// console.log(itemId);

for (var i = 0; i < 4; i++) {

    let goodsTemp = Math.floor(Math.random() * 10);

    let itemId = dataJson[goodsTemp]["goods_id"];
    // console.log(itemId);

    let lis = document.createElement("li");
    // console.log(mainRushUl);
    mainRushUl.appendChild(lis);
    lis.className = "crLi";
    //  mainRushUl.appendChild(lis);
    //  mainRush.appendChild(mainRushUl);

    let img = document.createElement("img");
    lis.appendChild(img);
    img.src = dataJson[goodsTemp]["image_url"];
    // console.log(img.src);

    let p1 = document.createElement("p");
    p1.className = "rush-go1";
    lis.appendChild(p1);
    p1.innerHTML = dataJson[goodsTemp]["short_name"];
    // console.log(p1.text);


    let p2 = document.createElement("p");
    p2.className = "rush-go2";
    lis.appendChild(p2);

    let span1 = document.createElement("span");
    span1.className = "rush-go4";
    p2.appendChild(span1);
    span1.innerHTML = "￥"+dataJson[goodsTemp]["group_price"];

    let span2 = document.createElement("span");
    span2.className = "rush-go3";
    let del = document.createElement("del");
    span2.appendChild(del);
    p2.appendChild(del);
    del.innerHTML = "￥"+dataJson[goodsTemp]["market_price"];
}





/* 
*  点击商品后进入到指定的商品详情页
*/

let clickLi = document.getElementsByClassName("crLi");
let goosMsg = goods.msg;

clickLi.onclick = function(){

    
    let goosId = this.goosMsg["goods_id"];
    console.log(goosId);

    localStorage.setItem("goosId",goosId);



}





/* 
 *  好物推荐模块  请求json 数据
 */

/* $.ajax({

    type: "GET",
    url: "./goods.json",
    dataType: "json",
    success: function (data) {
        console.log(data);
        let crDiv = document.getElementsByClassName("main-CharacteristicRecommendation");
        let crUl = document.getElementsByClassName("crUl");

        for (let i = 0; i < 21; i++) {

            let crLis = document.createElement("li");
            crUl.appendChild(crLis);
            crLis.className = "crLi";

            let crImg = document.createElement("img");
            crLis.appendChild(crImg);
            crImg.className = "crImg";
            $(".crImg").text(data.image_url);

            let crp1 = document.createElement("p");
            crLis.appendChild(crp1);
            crp1.className = "crli1";
            $(".crli1").text(data.goods_name);

            let crp2 = document.createElement("p");
            crLis.appendChild(crp2);
            crp2.className = "crli2";
            crp2.innerHTML = "惊喜价";

            let crSpan = document.createElement("span");
            crp2.appendChild(crSpan);
            crSpan.className = "crspan";
            $(".crSpan").text(data.normal_price);

        }

    }

})
 */


let goodJson = goods.msg;
let crDiv = document.getElementsByClassName("main-CharacteristicRecommendation");


for (let i = 0; i < 20; i++) {

    let mchrul = document.getElementsByClassName("mchrul")[0];

    /* let goodsTemp = setTimeout(function(){
        goodsTemp =  Math.floor(Math.random() * 10);
    },1000); */

    let goodsTemp = Math.floor(Math.random() * 10);
    let itemId = dataJson[goodsTemp]["goods_id"];
    // console.log(itemId);

    // let crUl = document.getElementsByClassName("crUl");
    let crLis = document.createElement("li");
    mchrul.appendChild(crLis);
    crLis.className = "crLi";
    console.log(crLis);

    let crImg = document.createElement("img");
    crLis.appendChild(crImg);
    crImg.className = "crImg";
    // $(".crImg").text(data.image_url);
    crImg.src = dataJson[goodsTemp]["image_url"];


    let crp1 = document.createElement("p");
    crLis.appendChild(crp1);
    crp1.className = "crli1";
    // $(".crli1").text(data.goods_name);
    crp1.innerHTML = dataJson[goodsTemp]["goods_name"];


    let crp2 = document.createElement("p");
    crLis.appendChild(crp2);
    crp2.className = "crli2";
    crp2.innerHTML = "惊喜价";


    let crSpan = document.createElement("span");
    crp2.appendChild(crSpan);
    crSpan.className = "crspan";
    // $(".crSpan").text(data.normal_price);
    crSpan.innerHTML = "￥"+dataJson[goodsTemp]["normal_price"];

    
    let crp4 = document.createElement("p");
    crLis.appendChild(crp4);
    crp4.className = "crli3";
    crp4.innerHTML = "加入购物车";

}



// }