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
 *  创建商品详情列表，请求json 数据
 */

let dataJson = goods.msg;
let gl = document.getElementsByClassName("goodsList4");

let itemId = dataJson["goods_id"];

for (var i = 0; i < 32; i++) {

    let glu = document.getElementsByClassName("goodsL4Ul")[0];

    let goodsTemp = Math.floor(Math.random() * 12);
    let itemId = dataJson[goodsTemp]["goods_id"];
    console.log(itemId);

    let lis2 = document.createElement("li");
    glu.appendChild(lis2);
    lis2.className = "goosL4Li";
    lis2.onclick = function(){
        console.log("test");
        // window.open(`./front/pages/detailsPage.html?id=${dataJson[goodsTemp]["goods_id"]}`);
        window.open(`../pages/detailsPage.html?id=${dataJson[goodsTemp]["goods_id"]}`);
    }


    let img = document.createElement("img");
    lis2.appendChild(img);
    // img.src = "";
    img.src = dataJson[goodsTemp]["image_url"];
    img.id = "imgLg";

    let p1 = document.createElement("p");
    lis2.appendChild(p1);
    p1.className = "goodsL4p1";
    p1.id = "p1Lg";
    p1.innerHTML = "￥ "+dataJson[goodsTemp]["group_price"];

    let p2 = document.createElement("p");
    lis2.appendChild(p2);
    p2.className = "goodsL4p2";
    p2.id = "p2Lg";
    p2.innerHTML = dataJson[goodsTemp]["goods_name"];

    let p3 = document.createElement("p");
    lis2.appendChild(p3);
    p3.className = "goodsL4p3";
    p3.id = "p3Lg";
    p3.innerHTML = dataJson[goodsTemp]["sales_tip"];

    let p4 = document.createElement("p");
    lis2.appendChild(p4);
    p4.className = "goodsL4p4";
    p4.id = "p4Lg";
    p4.innerHTML = "加入购物车";

}




/* 
 *  图片懒加载功能的实现
 */

/* window.onload = function(){
var img2 = document.querySelectorAll("img");
var len2 = img2.length;
// 存储图片的加载位置
var n2 = 0;

// 获取图片的可视区域
var height = document.documentElement.clientHeight;
var top = document.body.scrollTop || document.documentElement.scrollTop;
for (var i = n2; i < len2; i++) {
    if (img2[i].offsetTop < height + top) {
        if (img2[i].getAttribute("src") == "") {
            img2[i].src = img2[i].getAttribute("dataSrc");
        }
        n2 = i + 1;
        console.log("第" + n2 + "张图片" + ",n=" + n2);
    }
}
}
 */


/* 
* 函数防抖与节流功能的实现
*/

function throttle(fn,mustRun = 500) {
    const timer = null;
    let previous = null;
    return function () {
      const now = new Date();
      const context = this;
      const args = arguments;
      if(!previous){
        previous = now;
      }
      const remaining = now -previous;
      if(mustRun && remaining >= mustRun){
        fn.apply(context,args);
        previous = now;
      }
    }
  }
//调用函数
/* window.onload=checkImgs;
window.onscroll = throttle(checkImgs); */