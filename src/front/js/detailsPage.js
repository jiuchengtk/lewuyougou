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
 *  放大镜功能的实现
 */

let details1 = document.getElementById("detailsCenter-one");
let details2 = document.getElementById("detailsCenter-oneBig");

let mask = details1.children[1];
let imgBig = details2.children[0];


// 鼠标移入，遮罩和第二个盒子显示
details1.onmouseover = function () {

    mask.style.display = "block";
    details2.style.display = "block";
};

// 鼠标移出，遮罩和第二个盒子隐藏
details1.onmouseout = function () {

    mask.style.display = "none";
    details2.style.display = "none";
}

let x = 0;
let y = 0;

//  鼠标移入，发生移动函数事件
details1.onmousemove = function (env) {

    var env = env || window.event;
    let x = env.clientX - this.offsetParent.offsetLeft - mask.offsetWidth / 2;
    let y = env.clientY - this.offsetParent.offsetTop - mask.offsetHeight / 2;

 
    if (x < 0) {
        x = 0;
    } else if (x > details1.offsetWidth - mask.offsetWidth) {
        x = details1.offsetWidth - mask.offsetWidth;
    }

  
    if (y < 0) {
        y = 0;
    } else if (y > details1.offsetHeight - mask.offsetHeight) {
        y = details1.offsetHeight - mask.offsetHeight;
    }

    mask.style.left = x + "px";
    mask.style.top = y + "px";
    
    imgBig.style.left = -x * details2.offsetWidth / details1.offsetWidth + "px";
    imgBig.style.top = -y * details2.offsetHeight / details1.offsetHeight + "px";
    // console.log(imgBig.style.left, imgBig.style.top);

};





/*
*  购物车功能的实现
*/


let dlt7 = document.getElementById("dlt7");

dlt7.onclick = function(){
    console.log(123);
    
    alert("成功添加到购物车中");

}